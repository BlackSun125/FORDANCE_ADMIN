import { useQuery } from '@tanstack/react-query';
import { paymentServices } from './services';

export const useAllPayment = () =>{
    const { status, data, error } = useQuery({
        queryKey: ['users_sessions_payment'],
        queryFn: paymentServices.GetAllUserSessionPayment,
      })
    return { status, data, error };
}