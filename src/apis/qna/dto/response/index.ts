import ResponseDto from "src/apis/response.dto";
import { QnaListItem } from "src/types";

export interface GetQnaListResponseDto extends ResponseDto{
    qnaListItem: QnaListItem[];
}

export interface GetQnaSearchListResponseDto extends ResponseDto{
    qnaListItem: QnaListItem[];
}

export interface GetQnaResponseDto extends ResponseDto{
    receptionNumber: number;
    qnaTitle: string;
    qnaContent: string;
    writerId: string;
    qnaDatetime: string;
    qnaStatus: boolean;
    qnaComment: string;
}