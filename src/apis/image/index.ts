import axios from "axios"

import { IMAGE_UPLOAD_URL } from "src/constant"

// function: image 업로드 API 함수
export const imageUploadRequest = async (data: FormData ,accessToken: string) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}` }};
    const result = await axios.post(IMAGE_UPLOAD_URL, data, config )
        .then(response => response.data as string)
        .catch(error => null)
    return result;
}