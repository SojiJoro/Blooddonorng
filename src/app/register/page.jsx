// app/register/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const donorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  phone: z.string().min(10, { message: "Enter a valid phone number." }),
  bloodType: z.string({ required_error: "Select your blood type." }),
  address: z.string().min(5, { message: "Enter your address." }),
  city: z.string().min(2, { message: "Enter your city." }),
  state: z.string().min(2, { message: "Enter your state." }),
  zipCode: z.string().min(5, { message: "Enter your zip code." }),
  medicalConditions: z.string().optional(),
  lastDonationDate: z.string().optional(),
});

const recipientFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  phone: z.string().min(10, { message: "Enter a valid phone number." }),
  bloodType: z.string({ required_error: "Select required blood type." }),
  hospitalName: z.string().min(2, { message: "Enter hospital name." }),
  address: z.string().min(5, { message: "Enter hospital address." }),
  city: z.string().min(2, { message: "Enter your city." }),
  state: z.string().min(2, { message: "Enter your state." }),
  zipCode: z.string().min(5, { message: "Enter your zip code." }),
  urgencyLevel: z.string({ required_error: "Select urgency level." }),
  patientDescription: z.string().min(10, { message: "Provide a brief description." }),
});

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("donor");

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "donor" || type === "recipient") {
      setActiveTab(type);
    }
  }, [searchParams]);

  const donorForm = useForm({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      medicalConditions: "",
      lastDonationDate: "",
    },
  });

  const recipientForm = useForm({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      hospitalName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      urgencyLevel: "",
      patientDescription: "",
    },
  });

  function onDonorSubmit(data) {
    console.log("Donor form submitted:", data);
    router.push("/dashboard");
  }

  function onRecipientSubmit(data) {
    console.log("Recipient form submitted:", data);
    router.push("/dashboard");
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
          }}
        />

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account and begin setting up your profile.
            </p>

            <div className="mt-6">
              <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>
              <div className="mt-3 md:flex md:items-center md:-mx-2">
                <button
                  onClick={() => setActiveTab("donor")}
                  className={`flex justify-center w-full px-6 py-3 text-white bg-red-500 rounded-lg md:w-auto md:mx-2 focus:outline-none ${activeTab==="donor"?"bg-red-600":"bg-red-500"}`}
                >
                  <span className="mx-2">Donor</span>
                </button>
                <button
                  onClick={() => setActiveTab("recipient")}
                  className={`flex justify-center w-full px-6 py-3 mt-4 text-red-500 border border-red-500 rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none ${activeTab==="recipient"?"bg-red-50 text-red-600":"border-red-500 text-red-500"}`}
                >
                  <span className="mx-2">Recipient</span>
                </button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="donor">Donor</TabsTrigger>
                <TabsTrigger value="recipient">Recipient</TabsTrigger>
              </TabsList>

              <TabsContent value="donor" className="p-0 mt-4">
                <Form>
                  <form onSubmit={donorForm.handleSubmit(onDonorSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Full Name */}
                    <FormField control={donorForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Email */}
                    <FormField control={donorForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Phone */}
                    <FormField control={donorForm.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl><Input placeholder="08012345678" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Blood Type */}
                    <FormField control={donorForm.control} name="bloodType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Type</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>{bloodTypes.map(bt=><SelectItem key={bt} value={bt}>{bt}</SelectItem>)}</SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Address */}
                    <FormField control={donorForm.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* City */}
                    <FormField control={donorForm.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Lagos" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* State */}
                    <FormField control={donorForm.control} name="state" render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl><Input placeholder="Oyo" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Zip Code */}
                    <FormField control={donorForm.control} name="zipCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl><Input placeholder="12345" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Medical Conditions */}
                    <FormField control={donorForm.control} name="medicalConditions" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Medical Conditions (Optional)</FormLabel>
                        <FormControl><Textarea placeholder="Any conditions?" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Last Donation Date */}
                    <FormField control={donorForm.control} name="lastDonationDate" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Last Donation Date (Optional)</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Submit */}
                    <div className="md:col-span-2 text-right mt-4">
                      <Button type="submit" className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg">Register as Donor</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="recipient" className="p-0 mt-4">
                <Form>
                  <form onSubmit={recipientForm.handleSubmit(onRecipientSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Name */}
                    <FormField control={recipientForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Name</FormLabel>
                        <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Email */}
                    <FormField control={recipientForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="jane@hospital.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Phone */}
                    <FormField control={recipientForm.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl><Input placeholder="08087654321" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Blood Type */}
                    <FormField control={recipientForm.control} name="bloodType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Blood Type</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>{bloodTypes.map(bt=><SelectItem key={bt} value={bt}>{bt}</SelectItem>)}</SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Hospital Name */}
                    <FormField control={recipientForm.control} name="hospitalName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Name</FormLabel>
                        <FormControl><Input placeholder="St. Maria Hospital" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Address */}
                    <FormField control={recipientForm.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Address</FormLabel>
                        <FormControl><Input placeholder="123 Health Rd" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* City */}
                    <FormField control={recipientForm.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Abuja" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* State */}
                    <FormField control={recipientForm.control} name="state" render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl><Input placeholder="FCT" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Zip Code */}
                    <FormField control={recipientForm.control} name="zipCode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl><Input placeholder="900001" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Urgency Level */}
                    <FormField control={recipientForm.control} name="urgencyLevel" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Urgency Level</FormLabel>
                        <FormControl><Select {...field}><SelectTrigger><SelectValue placeholder="Select urgency" /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent></Select></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Patient Description */}
                    <FormField control={recipientForm.control} name="patientDescription" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Patient Description</FormLabel>
                        <FormControl><Textarea placeholder="Brief description" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* Submit */}
                    <div className="md:col-span-2 text-right mt-4">
                      <Button type="submit" className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg">Register as Recipient</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-gray-500">
              Already registered?{' '}
              <Link href="/login" className="text-red-600">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
