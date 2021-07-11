export type PromiseHandlingResult<T = any> = {
  data: T | null;
  error: Error | null;
};

export async function promiseHandling<T>(
  promise: Promise<T>
): Promise<PromiseHandlingResult<T>> {
  try {
    const data = await promise;

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
}
