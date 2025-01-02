import { supabase } from "../../global-variables/supabase";
import { instructor } from "../instructor/instructorApi";

async function GetAllUserSessionPayment() {
  const res = await supabase.from("users_sessions_payment").select("*");
  return res.data;
}
async function GetPaymentTableRefSessionName() {
  try {
    const res = await supabase
      .from("sessions")
      .select(
        "id, session_name, users!sessions_instructor_id_fkey(name, trade_discount),payments(amount)"
      )
      .order("id");

    const result = res.data.map((session) => {
      let payment = 0;
      if (session.payments) {
        session.payments.forEach((p) => (payment += p.amount));
      }
      const returnedSession = { ...session, payments: payment };
      return returnedSession;
    });
    return { data: result, error: res.error };
  } catch (error) {
    alert({ error });
  }
}

async function GetPaymentTableRefInstructor(startDate, endDate) {
  const res = await supabase
    .from("users")
    .select(
      "id, name, trade_discount,sessions!sessions_instructor_id_fkey(id, session_name, payments(amount, status) ), instructor_payments(amount)"
    )
    .eq("role", "instructor")
    // .eq("sessions.payments.status", "student_paid")
    .gte("sessions.payments.timestamp", startDate.toLocaleDateString())
    .lte("sessions.payments.timestamp", endDate.toLocaleDateString())
    .gte("instructor_payments.created_at", startDate.toLocaleDateString())
    .lte("instructor_payments.created_at", endDate.toLocaleDateString());
  console.log({ res });

  const result = [];
  res.data.forEach((item) => {
    if (item.sessions.length > 0 || item.instructor_payments.length > 0) {
      result.push(item);
    }
  });

  const data = [];
  result.forEach((ins) => {
    let totalPayment = 0;
    let commission = 0;
    ins.sessions.forEach((session) => {
      if (session.payments) {
        session.payments.forEach((payment) => {
          totalPayment += payment.amount;
          if (payment.status === "student_paid") {
            commission += payment.amount;
          }
        });
      }
    });

    let totalInstructorPayments = 0;
    if (ins.instructor_payments)
      ins.instructor_payments.forEach((item) => {
        totalInstructorPayments += item.amount;
      });

    const res = {
      id: ins.id,
      name: ins.name,
      trade_discount: ins.trade_discount ?? 0,
      amount: totalPayment,
      commission: commission * ins.trade_discount,
      totalPaidForInstructor: totalInstructorPayments,
    };
    if (res.amount > 0) data.push(res);
    // return res;
  });
  console.log({ data });
  return { data: data, error: res.error };
}

async function PaidForInstructor(ins_id, amount, startDate, endDate) {
  const { error1 } = await supabase
    .from("instructor_payments")
    .insert({ instructor_id: ins_id, amount: amount });

  const res = await supabase
    .from("sessions")
    .select("id, session_name,instructor_id, payments(id,status)")
    .eq("instructor_id", ins_id)
    .eq("payments.status", "student_paid")
    .gte("payments.timestamp", startDate.toLocaleDateString())
    .lte("payments.timestamp", endDate.toLocaleDateString());
  const payments = [];
  res.data.forEach((session) => {
    if (session.payments) {
      session.payments.forEach((payment) => {
        const newPayment = {
          id: payment.id,
          status: "paid_for_instructor",
        };
        payments.push(newPayment);
      });
    }
  });
  const { error2 } = await supabase.from("payments").upsert(payments);
}

async function PercentForEachPart() {
  const res = await supabase.from("users_sessions_payment").select("*");
  return res.data;
}

export const paymentServices = {
  GetAllUserSessionPayment,
  GetPaymentTableRefSessionName,
  GetPaymentTableRefInstructor,
  PaidForInstructor,
};
