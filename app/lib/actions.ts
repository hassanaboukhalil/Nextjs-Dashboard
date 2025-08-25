"use server";
// By adding the 'use server', you mark all the exported functions within the file as Server Actions.
// Any functions included in this file that are not used will be automatically removed from the final application bundle.
// Behind the scenes, Server Actions create a POST API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.

import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), // coerce is used to convert the value to a number while also validating the value
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  //   const rawFormData = {
  //     customerId: formData.get("customerId"),
  //     amount: formData.get("amount"),
  //     status: formData.get("status"),
  //   };

  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // Test it out:
  //   console.log(customerId, amountInCents, status);
}
