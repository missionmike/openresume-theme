import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Education } from "./Education";
import { formatLongDate } from "@/lib/format";

describe("Education", () => {
  const mockEducation = [
    {
      id: "1",
      school: "University of Test",
      degree: "B.S. Computer Science",
      dateAwarded: "1611216000000",
    },
    {
      id: "2",
      school: "University of Test",
      degree: "M.S. Computer Science",
      dateAwarded: "1642752000000",
    },
    {
      id: "3",
      school: "Another University",
      degree: "Ph.D. Computer Science",
      dateAwarded: "1674288000000",
    },
  ];

  it("renders education section title", () => {
    render(<Education education={mockEducation} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  it("groups education by school", () => {
    render(<Education education={mockEducation} />);

    // Should show both schools
    expect(screen.getByText("University of Test")).toBeInTheDocument();
    expect(screen.getByText("Another University")).toBeInTheDocument();

    // Should show all degrees
    expect(screen.getByText(/B\.S\. Computer Science/)).toBeInTheDocument();
    expect(screen.getByText(/M\.S\. Computer Science/)).toBeInTheDocument();
    expect(screen.getByText(/Ph\.D\. Computer Science/)).toBeInTheDocument();
  });

  it("formats dates correctly", () => {
    render(<Education education={mockEducation} />);

    // Check if dates are formatted correctly
    mockEducation.forEach((edu) => {
      const formattedDate = formatLongDate(edu.dateAwarded);
      expect(screen.getByText(new RegExp(formattedDate))).toBeInTheDocument();
    });
  });

  it("handles empty education array", () => {
    render(<Education education={[]} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
    // Should still render the section title but no schools
  });

  it("handles education entry without school", () => {
    const educationWithoutSchool = [
      {
        id: "1",
        school: "",
        degree: "B.S. Computer Science",
        dateAwarded: "1611216000000",
      },
    ];

    render(<Education education={educationWithoutSchool} />);
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.queryByText(/B\.S\. Computer Science/)).not.toBeInTheDocument();
  });
});
