export interface PostQnaRequestDto{
    qnaTitle: string;
    qnaContent: string;
}

export interface PostQnaCommentRequestDto{
    qnaComment: string;
}

export interface PatchQnaRequestDto{
    qnaTitle: string;
    qnaContent: string;
}

export interface PatchQnaCommentRequestDto{
    qnaComment: string;
}
