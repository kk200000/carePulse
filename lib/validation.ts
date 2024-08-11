// 表单校验
import { z } from 'zod'

export const userFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: '姓名至少2个字符' })
    .max(50, { message: '姓名最多50个字符' }),
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), '无效的电话号码'),
})
