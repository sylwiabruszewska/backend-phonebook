import { sendVerificationMail } from "@/helpers/sendVerificationMail";
import { mockRequest } from "@/__mocks__/node-mailjet";
import { SendVerificationMailProps } from "@/types/custom";

describe("sendVerificationMail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send verification email successfully", async () => {
    const mockProps: SendVerificationMailProps = {
      userEmail: "test@example.com",
      verificationToken: "mockToken123",
    };

    await sendVerificationMail(mockProps);

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        Recipients: [{ Email: mockProps.userEmail }],
        "Html-part": expect.stringContaining(mockProps.verificationToken),
      })
    );
  });

  test("should handle errors when sending email fails", async () => {
    mockRequest.mockRejectedValueOnce(new Error("Failed to send email"));

    const mockProps: SendVerificationMailProps = {
      userEmail: "test@example.com",
      verificationToken: "mockToken123",
    };

    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    await sendVerificationMail(mockProps);

    expect(spy).toHaveBeenCalledWith("Error sending email:", expect.any(Error));
    spy.mockRestore();
  });
});
