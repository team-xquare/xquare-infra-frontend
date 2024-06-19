import axios, { AxiosError } from 'axios';

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

export const checkFileExists = async (repoUrl: string | undefined, branch: string, filePath: string) => {
    const url = `https://api.github.com/repos/${repoUrl}/contents/${filePath}?ref=${branch}`;
    try {
        await axios.get(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            }
        });
        return true;
    } catch (error) {
        if (isAxiosError(error) && error.response && error.response.status === 404) {
            return false;
        } else {
            throw error;
        }
    }
};
