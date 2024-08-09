// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getJsonOrThrow = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.reason || 'Server Error');
  }
  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getResponseOrThrow = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.reason || 'Server Error');
  }
  return response;
};
