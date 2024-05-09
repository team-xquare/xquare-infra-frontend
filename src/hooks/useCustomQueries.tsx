import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { instance } from '@/utils/apis/axios';

interface QueryPropType {
  queryKey: string[];
  url: string;
  select: (res: AxiosResponse) => any | void;
  onSuccess?: () => void;
  onError?: () => void;
}

interface MutationPropType {
  type: 'post' | 'patch' | 'put';
  url: string;
  data: any;
  onSuccess?: (res: AxiosResponse) => any | void;
  onError?: (res: AxiosError) => any | void;
}

export const useCustomQuery = ({
  queryKey,
  url,
  select,
  onSuccess,
  onError = () => alert('오류가 발생했습니다'),
}: QueryPropType) => {
  const { data, isLoading, isError, isSuccess } = useQuery({ queryKey, queryFn: () => instance.get(url), select });

  if (isError) onError();
  if (isSuccess) !!onSuccess && onSuccess();

  return { data, isLoading, isError, isSuccess };
};

export const useCustomMutation = ({ type, url, data, onSuccess, onError }: MutationPropType) => {
  const { mutate } = useMutation({ mutationFn: () => instance[type](url, data), onSuccess, onError });
  return { mutate };
};
