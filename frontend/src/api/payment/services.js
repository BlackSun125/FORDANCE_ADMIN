import { supabase } from "../../global-variables/supabase";

async function GetAllUserSessionPayment(){
    const res = await supabase.from('users_sessions_payment').select('*');
    return res.data;
}

export const paymentServices = {GetAllUserSessionPayment};