/**
 * EnrollmentForm Component
 * Design Philosophy: Modern Blue Theme with Premium Animations
 * Features: Form validation, batch selection, multi-language support
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
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
      const selectedBatchData = batches.find((b) => b.id === formData.batch);
      if (!selectedBatchData) {
        throw new Error("Invalid batch selected");
      }

      const startDate = new Date(selectedBatchData.startDate);
      const endDate = new Date(startDate.getTime() + 56 * 24 * 60 * 60 * 1000);
      const endDateStr = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          batch: selectedBatchData.name,
          batchStartDate: selectedBatchData.startDate,
          batchEndDate: endDateStr,
          price: 15000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit enrollment");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", batch: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedBatch = batches.find((b) => b.id === formData.batch);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8 border border-[#E0E7FF] shadow-lg hover:shadow-xl transition-all duration-500">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-2">
            {t('enroll.title')}
          </h2>
          <p className="text-[#7A7A7A]">
            {t('enroll.subtitle')}
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-slide-in-left">
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
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-slide-in-left">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="name" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              {t('enroll.form.name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                errors.name
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] bg-white focus:border-[#2563EB]"
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="email" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              {t('enroll.form.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                errors.email
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] bg-white focus:border-[#2563EB]"
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Batch Selection */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
            <label htmlFor="batch" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              {t('enroll.form.batch')} *
            </label>
            <select
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg appearance-none bg-white ${
                errors.batch
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] focus:border-[#2563EB]"
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
            <div className="p-4 bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] rounded-lg border border-[#BFDBFE] animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
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
                  <span className="text-[#2563EB] font-semibold">
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
          <div className="flex items-start gap-3 animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 rounded border-[#E0E7FF] text-[#2563EB] focus:ring-[#2563EB]"
              required
              disabled={isSubmitting}
            />
            <label htmlFor="terms" className="text-sm text-[#7A7A7A]">
              {t('enroll.form.terms')}
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl animate-slide-in-left"
            style={{ animationDelay: '0.6s' }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="inline-block animate-spin">⏳</span>
                Submitting...
              </span>
            ) : (
              t('enroll.form.submit')
            )}
          </Button>

          {/* Additional Info */}
          <p className="text-center text-xs text-[#7A7A7A]">
            {t('enroll.form.privacy')}
          </p>
        </form>
      </Card>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
