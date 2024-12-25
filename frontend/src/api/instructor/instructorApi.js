import { supabase } from "../../global-variables/supabase"; 

async function GetListInstructors(username) {
  const res = await supabase
    .from("users")
    .select(
      "*, classes(id, class_name),sessions!sessions_instructor_id_fkey(id, session_name)"
    )
    .eq("role", "instructor");
  return res.data;
}

async function fetchPaginatedData(page, perPage) {
  const {
    data: items,
    count,
    error,
  } = await supabase
    .from("users")
    .range(page * perPage, (page + 1) * perPage - 1)
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error fetching data:", error.message);
  }

  return { items, count };
}

export const instructor = { GetListInstructors , fetchPaginatedData};
