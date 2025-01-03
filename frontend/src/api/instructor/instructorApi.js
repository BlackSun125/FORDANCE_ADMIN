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

async function GetOneInsById(id) {
  const res = await supabase.from("users").select("*").eq("id", id);
  return res.data;
}

async function fetchPaginatedData(page, perPage) {
  const {
    data: items,
    count,
    error,
  } = await supabase
    .from("users")
    .select(
      "*, classes(id, class_name),sessions!sessions_instructor_id_fkey(id, session_name)",
      { count: "exact" }
    )
    .eq("role", "instructor")
    .range((page - 1) * perPage, page * perPage - 1);
  if (error) {
    console.error("Error fetching data:", error.message);
  }

  return { items, count };
}

export const instructor = {
  GetListInstructors,
  fetchPaginatedData,
  GetOneInsById,
};
