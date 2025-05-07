import { render, screen, fireEvent } from "@testing-library/react";
import AddButtonWithDropdown from "./AddButtonWithDropdown";

describe("AddButtonWithDropdown", () => {
  it("shows dropdown on button click", () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText(/Add \+/i));
    expect(screen.getByText(/Add Wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Exchange/i)).toBeInTheDocument();
  });

  it("shows modal when Add Wallet is clicked", () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText(/Add \+/i));
    fireEvent.click(screen.getByText(/Add Wallet/i));
    expect(screen.getByText(/Add Wallet/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Logo/i).length).toBeGreaterThan(0);
  });

  it("shows modal when Add Exchange is clicked", () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText(/Add \+/i));
    fireEvent.click(screen.getByText(/Add Exchange/i));
    expect(screen.getByText(/Add Exchange/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Logo/i).length).toBeGreaterThan(0);
  });

  it("closes modal on × click", () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText(/Add \+/i));
    fireEvent.click(screen.getByText(/Add Wallet/i));
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText(/Add Wallet/i)).not.toBeInTheDocument();
  });
});
