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
import { trpc } from "@/lib/trpc";
import { getAllStates, getDistricts } from "india-state-district";

interface FormData {
  name: string;
  email: string;
  mobileNo: string;
  gender: string;
  dateOfBirth: string;
  state: string;
  district: string;
  area: string;
  currentStatus: string;

  course: string;
  specialization: string;
  collegeName: string;
  university: string;
  yearOfStudy: string;

  degreeCompleted: string;
  subjectMajor: string;
  yearOfGraduation: string;
  interestedInTeaching: string;

  teachingLevel: string;
  subjectTeaching: string;
  yearsExperience: string;
  instituteName: string;

  joiningReason: string;
  preferredTeachingSubject: string;
  preferredJobLocation: string;
  learningMode: string;

  skills: string;
  languagesKnown: string;
  technicalSkills: string;

  jobAlerts: string;
  preferredSalaryRange: string;
  teachingConfidence: string;

  resumeFileName: string;
  certificateFileName: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobileNo?: string;
  dateOfBirth?: string;
  state?: string;
  district?: string;
  area?: string;
  currentStatus?: string;
  course?: string;
  specialization?: string;
  collegeName?: string;
  university?: string;
  yearOfStudy?: string;
  degreeCompleted?: string;
  subjectMajor?: string;
  yearOfGraduation?: string;
  interestedInTeaching?: string;
  teachingLevel?: string;
  subjectTeaching?: string;
  yearsExperience?: string;
  instituteName?: string;
  joiningReason?: string;
  preferredTeachingSubject?: string;
  preferredJobLocation?: string;
  learningMode?: string;
  teachingConfidence?: string;
}

const statusOptions = [
  "Student",
  "Graduate",
  "Teacher",
  "Working Professional",
  "Career Switcher",
  "Other",
];

const studentCourses = ["B.Ed", "M.Ed"];
const studyYearOptions = ["1st year", "2nd year"];
const teachingLevels = ["Primary", "Secondary", "Higher Secondary", "College"];
const joiningReasons = [
  "Get Teaching Job",
  "Learn Teaching Skills",
  "Exam Preparation (TET, CTET, etc.)",
  "Career Switch",
];
const learningModes = ["Online", "Offline", "Both"];
const confidenceOptions = ["1", "2", "3", "4", "5"];

const stateOptions = getAllStates()
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

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
    mobileNo: "",
    gender: "",
    dateOfBirth: "",
    state: "",
    district: "",
    area: "",
    currentStatus: "",
    course: "",
    specialization: "",
    collegeName: "",
    university: "",
    yearOfStudy: "",
    degreeCompleted: "",
    subjectMajor: "",
    yearOfGraduation: "",
    interestedInTeaching: "",
    teachingLevel: "",
    subjectTeaching: "",
    yearsExperience: "",
    instituteName: "",
    joiningReason: "",
    preferredTeachingSubject: "",
    preferredJobLocation: "",
    learningMode: "",
    skills: "",
    languagesKnown: "",
    technicalSkills: "",
    jobAlerts: "",
    preferredSalaryRange: "",
    teachingConfidence: "",
    resumeFileName: "",
    certificateFileName: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const selectedState = stateOptions.find((s) => s.name === formData.state);
  const districtOptions = selectedState ? getDistricts(selectedState.code) : [];

  const createEnrollment = trpc.enrollmentPublic.create.useMutation();

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

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobileNo.trim())) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }

    if (!formData.currentStatus.trim()) {
      newErrors.currentStatus = "Current status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name: string, value: string) => {
    let error: string | undefined = undefined;

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
      else if (value.trim().length < 2) error = "Name must be at least 2 characters";
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Please enter a valid email address";
    }
    if (name === "mobileNo") {
      const mobileRegex = /^[0-9]{10}$/;
      if (!value.trim()) error = "Mobile number is required";
      else if (!mobileRegex.test(value.trim())) error = "Mobile number must be 10 digits";
    }
    if (name === "state" && !value.trim()) {
      error = "State is required";
    }
    if (name === "district" && !value.trim()) {
      error = "District is required";
    }
    if (name === "currentStatus" && !value.trim()) {
      error = "Current status is required";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: "",
      }));
      validateField(name, value);
      // Validate district immediately since state changed
      validateField("district", ""); 
      return;
    }

    if (name === "currentStatus") {
      setFormData((prev) => ({
        ...prev,
        currentStatus: value,
        course: "",
        specialization: "",
        collegeName: "",
        university: "",
        yearOfStudy: "",
        degreeCompleted: "",
        subjectMajor: "",
        yearOfGraduation: "",
        interestedInTeaching: "",
        teachingLevel: "",
        subjectTeaching: "",
        yearsExperience: "",
        instituteName: "",
      }));
      validateField(name, value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Perform real-time validation on typing
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedBatchData = batches[0];

      const startDate = new Date(selectedBatchData.startDate);
      const endDate = new Date(startDate.getTime() + 56 * 24 * 60 * 60 * 1000);
      const endDateStr = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      await createEnrollment.mutateAsync({
        name: formData.name,
        email: formData.email,
        mobileNo: formData.mobileNo,
        gender: formData.gender || null,
        dateOfBirth: formData.dateOfBirth,
        state: formData.state,
        district: formData.district,
        area: formData.area,
        currentStatus: formData.currentStatus,

        course: formData.course || null,
        specialization: formData.specialization || null,
        collegeName: formData.collegeName || null,
        university: formData.university || null,
        yearOfStudy: formData.yearOfStudy || null,

        degreeCompleted: formData.degreeCompleted || null,
        subjectMajor: formData.subjectMajor || null,
        yearOfGraduation: formData.yearOfGraduation || null,
        interestedInTeaching: formData.interestedInTeaching || null,

        teachingLevel: formData.teachingLevel || null,
        subjectTeaching: formData.subjectTeaching || null,
        yearsExperience: formData.yearsExperience || null,
        instituteName: formData.instituteName || null,

        joiningReason: formData.joiningReason,
        preferredTeachingSubject: formData.preferredTeachingSubject.trim(),
        preferredJobLocation: formData.preferredJobLocation.trim(),
        learningMode: formData.learningMode,

        skills: formData.skills || null,
        languagesKnown: formData.languagesKnown || null,
        technicalSkills: formData.technicalSkills || null,

        jobAlerts: formData.jobAlerts || null,
        preferredSalaryRange: formData.preferredSalaryRange || null,
        teachingConfidence: formData.teachingConfidence,

        resumeFileName: formData.resumeFileName || null,
        certificateFileName: formData.certificateFileName || null,
        batch: selectedBatchData.name,
        batchStartDate: selectedBatchData.startDate,
        batchEndDate: endDateStr,
        price: 15000,
      });

      setSubmittedName(formData.name);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobileNo: "",
        gender: "",
        dateOfBirth: "",
        state: "",
        district: "",
        area: "",
        currentStatus: "",
        course: "",
        specialization: "",
        collegeName: "",
        university: "",
        yearOfStudy: "",
        degreeCompleted: "",
        subjectMajor: "",
        yearOfGraduation: "",
        interestedInTeaching: "",
        teachingLevel: "",
        subjectTeaching: "",
        yearsExperience: "",
        instituteName: "",
        joiningReason: "",
        preferredTeachingSubject: "",
        preferredJobLocation: "",
        learningMode: "",
        skills: "",
        languagesKnown: "",
        technicalSkills: "",
        jobAlerts: "",
        preferredSalaryRange: "",
        teachingConfidence: "",
        resumeFileName: "",
        certificateFileName: "",
      });

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

  return (
    <div className="w-full mx-auto">
      <div className="w-full">
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
                Thank you for enrolling, {submittedName}! Check your email for
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

          {/* Mobile Number Field */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.25s' }}>
            <label htmlFor="mobileNo" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                errors.mobileNo
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] bg-white focus:border-[#2563EB]"
              }`}
              disabled={isSubmitting}
            />
            {errors.mobileNo && (
              <p className="text-red-600 text-sm mt-1">{errors.mobileNo}</p>
            )}
          </div>

          {/* State Field */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.29s' }}>
            <label htmlFor="state" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              State *
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg appearance-none bg-white ${
                errors.state
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] focus:border-[#2563EB]"
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select your state</option>
              {stateOptions.map((stateOption) => (
                <option key={stateOption.code} value={stateOption.name}>
                  {stateOption.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-600 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          {/* District Field */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.34s' }}>
            <label htmlFor="district" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              District *
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg appearance-none bg-white ${
                errors.district
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] focus:border-[#2563EB]"
              }`}
              disabled={isSubmitting || !formData.state}
            >
              <option value="">{formData.state ? "Select your district" : "Select state first"}</option>
              {districtOptions.map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-600 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="animate-slide-in-left" style={{ animationDelay: '0.27s' }}>
              <label htmlFor="gender" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Gender (Optional)
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white transition-all duration-300 focus:outline-none focus:shadow-lg focus:border-[#2563EB]"
                disabled={isSubmitting}
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="animate-slide-in-left" style={{ animationDelay: '0.39s' }}>
            <label htmlFor="currentStatus" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              Current Status *
            </label>
            <select
              id="currentStatus"
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg appearance-none bg-white ${
                errors.currentStatus
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] focus:border-[#2563EB]"
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select current status</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.currentStatus && (
              <p className="text-red-600 text-sm mt-1">{errors.currentStatus}</p>
            )}
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
      </div>

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
