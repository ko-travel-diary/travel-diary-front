import { useEffect, useState } from "react";
import { COUNT_PER_PAGE, COUNT_PER_SECTION } from "src/constant";
import { useUserStore } from "src/stores";

const usePagination = <T>() => {
    const { loginUserId } = useUserStore();

    const [boardList, setBoardList] = useState<T[]>([]);
    const [restaurantListItem, setRestaurantListItem] = useState<T[]>([]);
    const [tourAttractionsListItem, setTourAttractionsListItem] = useState<T[]>([]);

    const [viewList, setViewList] = useState<T[]>([]);
    const [restViewList, setRestViewList] = useState<T[]>([]);
    const [tourViewList, setTourViewList] = useState<T[]>([]);

    const [totalPage, setTotalPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);

    const [boardCount, setBoardCount] = useState<number>(1);

    const changePage = (boardList: T[], totalLenght: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = boardList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeRestPage = (restaurantListItem: T[], totalLength: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLength - 1) endIndex = totalLength;
        const restViewList = restaurantListItem.slice(startIndex, endIndex);
        setRestViewList(restViewList);
    };

    const changeTourPage = (tourAttractionsListItem: T[], totalLength: number) => {
        if (!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLength - 1) endIndex = totalLength;
        const tourViewList = tourAttractionsListItem.slice(startIndex, endIndex);
        setTourViewList(tourViewList);
    };

    const changeSection = (totalPage: number) => {
        if (!currentSection) return;
        const startPage = currentSection * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };

    const changeBoardList = (boardList: T[], isAdminToggleOn?: boolean, isUserToggleOn?: boolean) => {
        if (!boardList) return;
        if (isAdminToggleOn)
            boardList = boardList.filter((board: any) => {
                if ("qnaStatus" in board) return !board.qnaStatus;
                return false;
            });
        if (isUserToggleOn)
            boardList = boardList.filter((board: any) => {
                if ("qnaWriterId" in board) return loginUserId === board.qnaWriterId;
                return false;
            });
        setBoardList(boardList);

        const totalLenght = boardList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(boardList, totalLenght);
        changeSection(totalPage);

        setBoardCount(totalLenght);
    };

    const changeRestList = (restaurantListItem: T[]) => {
        setRestaurantListItem(restaurantListItem);

        const totalLength = restaurantListItem.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changeRestPage(restaurantListItem, totalLength);
        changeSection(totalPage);
    };

    const changeTourList = (tourAttractionsListItem: T[]) => {
        setTourAttractionsListItem(tourAttractionsListItem);

        const totalLength = tourAttractionsListItem.length;
        setTotalLength(totalLength);

        const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changeTourPage(tourAttractionsListItem, totalLength);
        changeSection(totalPage);
    };

    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    useEffect(() => {
        if (boardList.length) changePage(boardList, totalLength);
        if (restaurantListItem.length) changeRestPage(restaurantListItem, totalLength);
        if (tourAttractionsListItem.length) changeTourPage(tourAttractionsListItem, totalLength);
    }, [currentPage]);

    useEffect(() => {
        if (boardList.length) changeSection(totalPage);
        if (restaurantListItem.length) changeSection(totalPage);
        if (tourAttractionsListItem.length) changeSection(totalPage);
    }, [currentSection]);

    return {
        viewList,
        pageList,
        boardList,
        restViewList,
        tourViewList,
        totalPage,
        totalLength,
        currentPage,
        boardCount,

        setCurrentPage,
        setCurrentSection,

        changeRestList,
        changeTourList,
        changeBoardList,

        onPreSectionClickHandler,
        onPageClickHandler,
        onNextSectionClickHandler,
    };
};

export default usePagination;
