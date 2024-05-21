import ResponseDto from "src/apis/response.dto";
import { QnaListItem } from "src/types";

export interface GetQnaListResponseDto extends ResponseDto{
    qnaList: QnaListItem[];
}

export interface GetQnaSearchListResponseDto extends ResponseDto{
    searchQnaList: QnaListItem[];
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