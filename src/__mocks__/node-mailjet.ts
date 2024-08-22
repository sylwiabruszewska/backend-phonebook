// const Mailjet = {
//   apiConnect: jest.fn().mockReturnValue({
//     post: jest.fn().mockReturnThis(),
//     request: jest.fn().mockResolvedValue({ body: {} }),
//   }),
// };

// export default Mailjet;

const mockPost = jest.fn().mockReturnThis();
const mockRequest = jest.fn().mockResolvedValue({ body: "mock response" });

const Mailjet = {
  apiConnect: jest.fn().mockReturnValue({
    post: mockPost.mockReturnValue({ request: mockRequest }),
  }),
};

export default Mailjet;
export { mockPost, mockRequest };
