import * as yup from "yup";

const validationSchema = yup.object({
    attachments: yup.array().max(5, 'Files must be less than Five'),
    description: yup.string().required('Description must be added'),
    budget: yup.number().required('Request price must be added').positive('Price must be positive').min(5, 'The minimum price must be $5'),
    category: yup.number().required('Category is Required'),
    category_id: yup.number().required('Sub Category is Required'),
    delivery_time: yup.string().required('Delivery Duration must be added'),
  });


export default validationSchema;