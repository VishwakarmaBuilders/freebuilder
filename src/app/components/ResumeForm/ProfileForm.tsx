import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { QuickGuide } from "components/ResumeForm/Form/QuickGuide";
import { LoadExampleButton } from "components/ResumeForm/LoadExampleButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location } = profile;

  // Check if this is an empty section (all fields empty)
  const isEmptySection = !name && !email && !phone && !url && !summary && !location;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm
      quickGuide={
        <QuickGuide text="Enter your basic personal information like name, job title, and contact details. This helps recruiters reach you easily." />
      }
    >
      <div className="flex justify-end mb-3">
        <LoadExampleButton />
      </div>
      {isEmptySection && (
        <div className="mb-3 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
          <p className="font-medium">No data found from imported resume</p>
          <p className="mt-1 text-blue-700">You can enter your profile information here manually.</p>
        </div>
      )}
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Aarav Mehta"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Full-stack developer passionate about building scalable and user-friendly web applications"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="aarav.mehta@example.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="76311****1"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/aaravmehta-example"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="Bangalore, IN"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
