"use client";
import * as z from "zod";
import { formSchema } from "../form-schema";
import { serverAction } from "../actions/server-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
export function DraftForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  const [state, action, isPending] = React.useActionState(
    serverAction,
    initialState
  );

  return (
    <div>
      <Form {...form}>
        <form
          action={action}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
        >
          <MultiStepViewer form={form} />
          <div className="flex justify-end items-center w-full pt-3">
            <Button className="rounded-lg" size="sm">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
//------------------------------
/**
 * Used to render a multi-step form in preview mode
 */
export function MultiStepViewer({ form }: { form: any }) {
  const stepFormElements: {
    [key: number]: JSX.Element;
  } = {
    1: (
      <div>
        <h2 className="text-2xl font-bold">Introduction</h2>
        <p className="text-base">Please fill the form below to contact us</p>

        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type={"email"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to the terms and conditions</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    ),
    2: (
      <div>
        <h2 className="text-2xl font-bold">Security</h2>

        <FormField
          control={form.control}
          name="Password-100"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Create a Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your password"
                  type="password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Password-101"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your password"
                  type="password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ),
    3: (
      <div>
        <h3 className="text-xl font-bold">Verifying</h3>
        <p className="text-base">Check your inbox Gmail</p>

        <FormField
          control={form.control}
          name="OTP-101"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Verify Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  };

  const steps = Object.keys(stepFormElements).map(Number);
  const { currentStep, isLastStep, goToNext, goToPrevious } = useMultiStepForm({
    initialSteps: steps,
    onStepValidation: () => {
      /**
       * TODO: handle step validation
       */
      return true;
    }
  });
  const current = stepFormElements[currentStep - 1];
  const {
    formState: { isSubmitting }
  } = form;
  return (
    <div className="flex flex-col gap-2 pt-3">
      <div className="flex-col-start gap-1">
        <span className="">
          Step {currentStep} of {steps.length}
        </span>
        <Progress value={(currentStep / steps.length) * 100} />
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex flex-col gap-2"
        >
          {current}
        </motion.div>
      </AnimatePresence>
      <div className="flex-row-between gap-3 w-full pt-3">
        <Button size="sm" variant="ghost" onClick={goToPrevious} type="button">
          Previous
        </Button>
        {isLastStep ? (
          <Button size="sm" type="submit">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button
            size="sm"
            type="button"
            variant={"secondary"}
            onClick={goToNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

//------------------------------use-multi-step-form.tsx
type UseFormStepsProps = {
  initialSteps: any[];
  onStepValidation?: (step: any) => Promise<boolean> | boolean;
};

export type UseMultiFormStepsReturn = {
  steps: any[];

  currentStep: number;

  currentStepData: any;

  progress: number;

  isFirstStep: boolean;

  isLastStep: boolean;

  goToNext: () => Promise<boolean>;

  goToPrevious: () => void;
};

export function useMultiStepForm({
  initialSteps,
  onStepValidation
}: UseFormStepsProps): UseMultiFormStepsReturn {
  const steps = initialSteps;
  const [currentStep, setCurrentStep] = useState(1);
  const goToNext = useCallback(async () => {
    const currentStepData = initialSteps[currentStep - 1];

    if (onStepValidation) {
      const isValid = await onStepValidation(currentStepData);
      if (!isValid) return false;
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      return true;
    }
    return false;
  }, [currentStep, steps, onStepValidation, initialSteps]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  return {
    steps,
    currentStep,
    currentStepData: steps[currentStep - 1],
    progress: (currentStep / steps.length) * 100,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === steps.length,
    goToNext,
    goToPrevious
  };
}
