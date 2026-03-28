/**
 * EnrollmentForm Component
 * Design Philosophy: Modern Minimalist with Warm Accents
 * Features: Form validation, batch selection, email capture
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  batch: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  batch?: string;
}

const batches = [
  {
    id: "batch-april",
    name: "April 2026 Batch",
    startDate: "April 7, 2026",
    seats: 15,
  },
  {
    id: "batch-may",
    name: "May 2026 Batch",
    startDate: "May 12, 2026",
    seats: 20,
  },
  {
    id: "batch-june",
    name: "June 2026 Batch",
    startDate: "June 9, 2026",
    seats: 25,
  },
];

export default function EnrollmentForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    batch: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate batch selection
    if (!formData.batch) {
      newErrors.batch = "Please select a batch";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in production, this would send to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", batch: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedBatch = batches.find((b) => b.id === formData.batch);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="card-warm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-2">
            Enroll in Educators Point
          </h2>
          <p className="text-[#7A7A7A]">
            Join our next batch and transform your teaching career. Fill out the
            form below to secure your seat.
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">
                Enrollment Successful!
              </h3>
              <p className="text-green-800 text-sm">
                Thank you for enrolling, {formData.name}! Check your email for
                confirmation details and next steps.
              </p>
            </div>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                errors.name
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E8E8E8] bg-white focus:border-[#D97757]"
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                errors.email
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E8E8E8] bg-white focus:border-[#D97757]"
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Batch Selection */}
          <div>
            <label htmlFor="batch" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              Select Your Batch *
            </label>
            <select
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none appearance-none bg-white ${
                errors.batch
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E8E8E8] focus:border-[#D97757]"
              }`}
              disabled={isSubmitting}
            >
              <option value="">-- Choose a batch --</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name} - Starts {batch.startDate} ({batch.seats} seats)
                </option>
              ))}
            </select>
            {errors.batch && (
              <p className="text-red-600 text-sm mt-1">{errors.batch}</p>
            )}
          </div>

          {/* Batch Details */}
          {selectedBatch && (
            <div className="p-4 bg-[#F5F5F5] rounded-lg border border-[#E8E8E8]">
              <h3 className="font-semibold text-[#2C2C2C] mb-2">Batch Details</h3>
              <div className="space-y-2 text-sm text-[#7A7A7A]">
                <p>
                  <span className="font-semibold text-[#2C2C2C]">Batch:</span>{" "}
                  {selectedBatch.name}
                </p>
                <p>
                  <span className="font-semibold text-[#2C2C2C]">Start Date:</span>{" "}
                  {selectedBatch.startDate}
                </p>
                <p>
                  <span className="font-semibold text-[#2C2C2C]">Available Seats:</span>{" "}
                  <span className="text-[#D97757] font-semibold">
                    {selectedBatch.seats}
                  </span>
                </p>
                <p className="text-xs text-[#7A7A7A] mt-3">
                  Early bird discount available for the first 20 enrollments!
                </p>
              </div>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 rounded border-[#E8E8E8] text-[#D97757] focus:ring-[#D97757]"
              required
              disabled={isSubmitting}
            />
            <label htmlFor="terms" className="text-sm text-[#7A7A7A]">
              I agree to the{" "}
              <a href="#" className="text-[#D97757] hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#D97757] hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D97757] hover:bg-[#C85F47] text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="inline-block animate-spin">⏳</span>
                Submitting...
              </span>
            ) : (
              "Secure Your Seat Now"
            )}
          </Button>

          {/* Additional Info */}
          <p className="text-center text-xs text-[#7A7A7A]">
            We respect your privacy. Your information will only be used for enrollment
            purposes.
          </p>
        </form>
      </Card>
    </div>
  );
}
