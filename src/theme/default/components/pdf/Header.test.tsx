import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import { User } from "@/types";

describe("Header", () => {
  const mockUser: User = {
    id: "test-id",
    name: "John Doe",
    title: "Software Engineer",
    location: "San Francisco, CA",
    displayEmail: "john@example.com",
  };

  it("renders user name", () => {
    render(<Header user={mockUser} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders user title", () => {
    render(<Header user={mockUser} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders location and email with separator", () => {
    render(<Header user={mockUser} />);
    const contactInfo = screen.getByText("San Francisco, CA |");
    expect(contactInfo).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "john@example.com" })).toBeInTheDocument();
  });

  it("renders email as clickable link", () => {
    render(<Header user={mockUser} />);
    const emailLink = screen.getByRole("link", { name: "john@example.com" });
    expect(emailLink).toHaveAttribute("href", "mailto:john@example.com");
  });

  it("handles missing location", () => {
    const userWithoutLocation = { ...mockUser, location: null };
    render(<Header user={userWithoutLocation} />);
    expect(screen.queryByText(/\|/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "john@example.com" })).toBeInTheDocument();
  });

  it("handles missing email", () => {
    const userWithoutEmail = { ...mockUser, displayEmail: null };
    render(<Header user={userWithoutEmail} />);
    expect(screen.getByText("San Francisco, CA |")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("handles missing location and email", () => {
    const userWithoutContactInfo = {
      ...mockUser,
      location: null,
      displayEmail: null,
    };
    render(<Header user={userWithoutContactInfo} />);
    expect(screen.queryByText(/\|/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
