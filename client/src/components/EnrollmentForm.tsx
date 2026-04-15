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

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.currentStatus.trim()) {
      newErrors.currentStatus = "Current status is required";
    }

    if (!formData.joiningReason.trim()) {
      newErrors.joiningReason = "Please select why you are joining";
    }

    if (!formData.preferredTeachingSubject.trim()) {
      newErrors.preferredTeachingSubject = "Preferred teaching subject is required";
    } else if (formData.preferredTeachingSubject.trim().length < 2) {
      newErrors.preferredTeachingSubject = "Preferred teaching subject must be at least 2 characters";
    }

    if (!formData.preferredJobLocation.trim()) {
      newErrors.preferredJobLocation = "Preferred job location is required";
    } else if (formData.preferredJobLocation.trim().length < 2) {
      newErrors.preferredJobLocation = "Preferred job location must be at least 2 characters";
    }

    if (!formData.learningMode.trim()) {
      newErrors.learningMode = "Please select preferred mode";
    }

    if (!formData.teachingConfidence.trim()) {
      newErrors.teachingConfidence = "Please rate your confidence";
    }

    if (formData.currentStatus === "Student") {
      if (!formData.course) newErrors.course = "Course is required";
      if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
      if (!formData.collegeName.trim()) newErrors.collegeName = "College name is required";
      if (!formData.university.trim()) newErrors.university = "University is required";
      if (!formData.yearOfStudy) newErrors.yearOfStudy = "Year of study is required";
    }

    if (formData.currentStatus === "Graduate") {
      if (!formData.degreeCompleted.trim()) newErrors.degreeCompleted = "Degree is required";
      if (!formData.subjectMajor.trim()) newErrors.subjectMajor = "Subject / major is required";
      if (!formData.yearOfGraduation.trim()) newErrors.yearOfGraduation = "Year of graduation is required";
      if (!formData.interestedInTeaching) newErrors.interestedInTeaching = "Please choose yes or no";
    }

    if (formData.currentStatus === "Teacher") {
      if (!formData.teachingLevel) newErrors.teachingLevel = "Teaching level is required";
      if (!formData.subjectTeaching.trim()) newErrors.subjectTeaching = "Subject teaching is required";
      if (!formData.yearsExperience.trim()) newErrors.yearsExperience = "Years of experience is required";
      if (!formData.instituteName.trim()) newErrors.instituteName = "School / college name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      setErrors((prev) => ({
        ...prev,
        state: undefined,
        district: undefined,
      }));
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
      setErrors((prev) => ({
        ...prev,
        currentStatus: undefined,
      }));
      return;
    }

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

            <div className="animate-slide-in-left" style={{ animationDelay: '0.28s' }}>
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                  errors.dateOfBirth
                    ? "border-red-500 bg-red-50 focus:border-red-600"
                    : "border-[#E0E7FF] bg-white focus:border-[#2563EB]"
                }`}
                disabled={isSubmitting}
              />
              {errors.dateOfBirth && (
                <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>
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

          {/* Area Field */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.36s' }}>
            <label htmlFor="area" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              Area *
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter your area"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:shadow-lg ${
                errors.area
                  ? "border-red-500 bg-red-50 focus:border-red-600"
                  : "border-[#E0E7FF] bg-white focus:border-[#2563EB]"
              }`}
              disabled={isSubmitting}
            />
            {errors.area && (
              <p className="text-red-600 text-sm mt-1">{errors.area}</p>
            )}
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

          {formData.currentStatus === "Student" && (
            <div className="space-y-4 p-4 rounded-lg border border-[#E0E7FF] bg-[#F8FAFF]">
              <p className="font-semibold text-[#2C2C2C]">Student Details</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="course" className="block text-sm font-semibold text-[#2C2C2C] mb-2">Course *</label>
                  <select id="course" name="course" value={formData.course} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white">
                    <option value="">Select course</option>
                    {studentCourses.map((course) => (<option key={course} value={course}>{course}</option>))}
                  </select>
                  {errors.course && <p className="text-red-600 text-sm mt-1">{errors.course}</p>}
                </div>
                <div>
                  <label htmlFor="yearOfStudy" className="block text-sm font-semibold text-[#2C2C2C] mb-2">Year of Study *</label>
                  <select id="yearOfStudy" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white">
                    <option value="">Select year</option>
                    {studyYearOptions.map((year) => (<option key={year} value={year}>{year}</option>))}
                  </select>
                  {errors.yearOfStudy && <p className="text-red-600 text-sm mt-1">{errors.yearOfStudy}</p>}
                </div>
              </div>
              <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization (Maths, Science, English, etc.)" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.specialization && <p className="text-red-600 text-sm mt-1">{errors.specialization}</p>}
              <input type="text" id="collegeName" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.collegeName && <p className="text-red-600 text-sm mt-1">{errors.collegeName}</p>}
              <input type="text" id="university" name="university" value={formData.university} onChange={handleChange} placeholder="University" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.university && <p className="text-red-600 text-sm mt-1">{errors.university}</p>}
            </div>
          )}

          {formData.currentStatus === "Graduate" && (
            <div className="space-y-4 p-4 rounded-lg border border-[#E0E7FF] bg-[#F8FAFF]">
              <p className="font-semibold text-[#2C2C2C]">Graduate Details</p>
              <input type="text" id="degreeCompleted" name="degreeCompleted" value={formData.degreeCompleted} onChange={handleChange} placeholder="Degree Completed" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.degreeCompleted && <p className="text-red-600 text-sm mt-1">{errors.degreeCompleted}</p>}
              <input type="text" id="subjectMajor" name="subjectMajor" value={formData.subjectMajor} onChange={handleChange} placeholder="Subject / Major" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.subjectMajor && <p className="text-red-600 text-sm mt-1">{errors.subjectMajor}</p>}
              <input type="text" id="yearOfGraduation" name="yearOfGraduation" value={formData.yearOfGraduation} onChange={handleChange} placeholder="Year of Graduation" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.yearOfGraduation && <p className="text-red-600 text-sm mt-1">{errors.yearOfGraduation}</p>}
              <select id="interestedInTeaching" name="interestedInTeaching" aria-label="Interested in teaching" value={formData.interestedInTeaching} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white">
                <option value="">Interested in Teaching?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.interestedInTeaching && <p className="text-red-600 text-sm mt-1">{errors.interestedInTeaching}</p>}
            </div>
          )}

          {formData.currentStatus === "Teacher" && (
            <div className="space-y-4 p-4 rounded-lg border border-[#E0E7FF] bg-[#F8FAFF]">
              <p className="font-semibold text-[#2C2C2C]">Teacher Details</p>
              <select id="teachingLevel" name="teachingLevel" aria-label="Teaching level" value={formData.teachingLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white">
                <option value="">Teaching Level</option>
                {teachingLevels.map((level) => (<option key={level} value={level}>{level}</option>))}
              </select>
              {errors.teachingLevel && <p className="text-red-600 text-sm mt-1">{errors.teachingLevel}</p>}
              <input type="text" id="subjectTeaching" name="subjectTeaching" value={formData.subjectTeaching} onChange={handleChange} placeholder="Subject Teaching" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.subjectTeaching && <p className="text-red-600 text-sm mt-1">{errors.subjectTeaching}</p>}
              <input type="text" id="yearsExperience" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} placeholder="Years of Experience" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.yearsExperience && <p className="text-red-600 text-sm mt-1">{errors.yearsExperience}</p>}
              <input type="text" id="instituteName" name="instituteName" value={formData.instituteName} onChange={handleChange} placeholder="School/College Name" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
              {errors.instituteName && <p className="text-red-600 text-sm mt-1">{errors.instituteName}</p>}
            </div>
          )}

          <div className="space-y-4 p-4 rounded-lg border border-[#E0E7FF] bg-[#F8FAFF]">
            <p className="font-semibold text-[#2C2C2C]">Career / Goal Details</p>
            <select id="joiningReason" name="joiningReason" aria-label="Why are you joining" value={formData.joiningReason} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white">
              <option value="">Why are you joining?</option>
              {joiningReasons.map((reason) => (<option key={reason} value={reason}>{reason}</option>))}
            </select>
            {errors.joiningReason && <p className="text-red-600 text-sm mt-1">{errors.joiningReason}</p>}
            <input type="text" id="preferredTeachingSubject" name="preferredTeachingSubject" value={formData.preferredTeachingSubject} onChange={handleChange} placeholder="Preferred Teaching Subject" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
            {errors.preferredTeachingSubject && <p className="text-red-600 text-sm mt-1">{errors.preferredTeachingSubject}</p>}
            <input type="text" id="preferredJobLocation" name="preferredJobLocation" value={formData.preferredJobLocation} onChange={handleChange} placeholder="Preferred Location for Job" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
            {errors.preferredJobLocation && <p className="text-red-600 text-sm mt-1">{errors.preferredJobLocation}</p>}
            <select id="learningMode" name="learningMode" aria-label="Preferred learning mode" value={formData.learningMode} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white text-sm sm:text-base">
              <option value="">Online / Offline / Both</option>
              {learningModes.map((mode) => (<option key={mode} value={mode}>{mode}</option>))}
            </select>
            {errors.learningMode && <p className="text-red-600 text-sm mt-1">{errors.learningMode}</p>}
          </div>

          <div className="space-y-4 p-4 rounded-lg border border-[#E0E7FF] bg-[#F8FAFF]">
            <p className="font-semibold text-[#2C2C2C]">Skills & Interests (Optional)</p>
            <textarea id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (Communication, Classroom Management, etc.)" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white min-h-[90px]" />
            <textarea id="languagesKnown" name="languagesKnown" value={formData.languagesKnown} onChange={handleChange} placeholder="Languages Known" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white min-h-[90px]" />
            <textarea id="technicalSkills" name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} placeholder="Technical Skills (if any)" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white min-h-[90px]" />
          </div>

          <div className="space-y-4 p-4 rounded-lg border border-[#E0E7FF] bg-[#F8FAFF]">
            <p className="font-semibold text-[#2C2C2C]">Smart Recommendation Inputs</p>
            <select id="jobAlerts" name="jobAlerts" aria-label="Do you want job alerts" value={formData.jobAlerts} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white">
              <option value="">Do you want job alerts?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input type="text" id="preferredSalaryRange" name="preferredSalaryRange" value={formData.preferredSalaryRange} onChange={handleChange} placeholder="Preferred salary range" className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white" />
            <select id="teachingConfidence" name="teachingConfidence" aria-label="Teaching confidence rating" value={formData.teachingConfidence} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-2 border-[#E0E7FF] bg-white text-sm sm:text-base">
              <option value="">Confidence in teaching (1-5)</option>
              {confidenceOptions.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            {errors.teachingConfidence && <p className="text-red-600 text-sm mt-1">{errors.teachingConfidence}</p>}
          </div>

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
