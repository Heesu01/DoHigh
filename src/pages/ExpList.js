import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import dropdownArrow from "../assets/dropdown.svg";
import infoIcon from "../assets/info.svg";
import useExpInfinite from "../hooks/useExpInfinite.js";
import useTooltipVisible from "../hooks/useTooltipVisible";

const coinMap = {
  S: require("../assets/coin/S.svg").default,
  A: require("../assets/coin/A.svg").default,
  B: require("../assets/coin/B.svg").default,
  C: require("../assets/coin/C.svg").default,
  D: require("../assets/coin/D.svg").default,
  BronzeDo: require("../assets/coin.svg").default,
  MAX: require("../assets/coin/GoldDo.svg").default,
  MED: require("../assets/coin/SilverDo.svg").default,
};

const tabList = [
  "전체",
  "인사평가",
  "직무 퀘스트",
  "리더 퀘스트",
  "전사 프로젝트",
];

const normalizeTab = (tab) => tab.replace(/\s/g, "");

const ExpList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "전체";
  const [selectedTab, setSelectedTab] = useState(normalizeTab(initialTab));
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("최신순");
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const {
    visible: infoOpen,
    setVisible: setInfoOpen,
    wrapperRef: infoRef,
  } = useTooltipVisible();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useExpInfinite(selectedTab, sortOption);

  const expList = data?.pages.flatMap((page) => page.exps) ?? [];

  useEffect(() => {
    setSearchParams({ tab: selectedTab });
  }, [selectedTab, setSearchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const imageSrc = getInfoImage();
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
    }
    setSortOption("최신순");
    setSortOpen(false);
  }, [selectedTab]);

  const handleSortClick = () => setSortOpen((prev) => !prev);
  const handleSortSelect = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(normalizeTab(tab));
    setInfoOpen(false);
  };

  const handleInfoClick = () => {
    setInfoOpen((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const normalizedDate = dateString.replace(/\./g, "-");
    return dayjs(normalizedDate).format("YYYY.MM.DD");
  };

  const getInfoImage = () => {
    switch (normalizeTab(selectedTab)) {
      case normalizeTab("직무 퀘스트"):
        return "/assets/expListInfo1.svg";
      case normalizeTab("인사평가"):
        return "/assets/expListInfo2.svg";
      case normalizeTab("리더 퀘스트"):
      case normalizeTab("전사 프로젝트"):
        return "/assets/expListInfo3.svg";
      default:
        return null;
    }
  };

  return (
    <Container>
      <TopContainer>
        <Header>
          <Title>경험치 내역</Title>
        </Header>

        <TabBar>
          {tabList.map((tab) => (
            <Tab
              key={tab}
              selected={normalizeTab(tab) === selectedTab}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </Tab>
          ))}
        </TabBar>

        <SortBar hasInfoIcon={selectedTab !== normalizeTab("전체")}>
          {selectedTab !== normalizeTab("전체") && (
            <InfoIconWrapper onClick={handleInfoClick} ref={infoRef}>
              <InfoIcon src={infoIcon} alt="정보" />
              {infoOpen && <InfoImage src={getInfoImage()} alt="정보 설명" />}
            </InfoIconWrapper>
          )}
          <SortButton onClick={handleSortClick}>
            <SortText>{sortOption}</SortText>
            <SortIcon src={dropdownArrow} alt="정렬" />
          </SortButton>
          {sortOpen && (
            <DropDownMenu>
              <DropDownItem onClick={() => handleSortSelect("최신순")}>
                최신순
              </DropDownItem>
              <DropDownItem onClick={() => handleSortSelect("오래된순")}>
                오래된순
              </DropDownItem>
            </DropDownMenu>
          )}
        </SortBar>
      </TopContainer>

      {loading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <ListContainer>
          {expList.map((item, index) => (
            <ListItem key={index}>
              <ItemLeft>
                <ItemIcon
                  src={coinMap[item.coin] || coinMap["BronzeDo"]}
                  alt={`${item.coin} 아이콘`}
                />
                <ItemInfo>
                  <ItemDate>{formatDate(item.date)}</ItemDate>
                  <ItemType>{item.questName}</ItemType>
                </ItemInfo>
              </ItemLeft>
              <ItemRight>
                <ItemGrade>{item.expName}</ItemGrade>
                <ItemPoints>{item.exp?.toLocaleString() ?? "0"}</ItemPoints>
              </ItemRight>
            </ListItem>
          ))}
          {hasNextPage && <ObserverTarget ref={observerRef} />}
        </ListContainer>
      )}
    </Container>
  );
};

export default ExpList;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.gray};
`;

const TopContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${(props) => props.theme.colors.gray};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  position: relative;
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
`;

const TabBar = styled.div`
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e7e8;
  height: 40px;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  ${(props) => props.theme.fonts.semiBold};
  padding: 13px 0;
  font-size: 16px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: ${(props) => (props.selected ? "5px solid #FC5833" : "none")};
  color: ${(props) =>
    props.selected ? props.theme.colors.black3 : props.theme.colors.gray2};
  min-width: 110px;
`;

const SortBar = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
  display: flex;
  justify-content: ${(props) =>
    props.hasInfoIcon ? "space-between" : "flex-end"};
  align-items: center;
  padding: 9px 28px;
  border-bottom: 2px solid #e6e7e8;
  padding-top: 19px;
`;

const InfoIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%);
    background: transparent;
    pointer-events: auto;
  }
`;

const InfoIcon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
  z-index: 10;
`;

const InfoImage = styled.img`
  position: absolute;
  top: 30px;
  left: -14px;
  z-index: 100;
`;

const SortButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SortText = styled.span`
  ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.gray2};
`;

const SortIcon = styled.img`
  margin-left: 8px;
  width: 13px;
  height: 7px;
`;

const DropDownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
  padding: 8px 0;
`;

const DropDownItem = styled.div`
  padding: 12px 14px;
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray2};
  }
`;

const ListContainer = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  border-bottom: 1px solid #e3e3e3;
  background-color: ${(props) => props.theme.colors.white};
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;
`;

const ItemIcon = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 17px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const ItemDate = styled.p`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
`;

const ItemType = styled.p`
  ${(props) => props.theme.fonts.semiBold};
  color: ${(props) => props.theme.colors.black};
`;

const ItemRight = styled.div`
  text-align: right;
`;

const ItemGrade = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray3};
`;

const ItemPoints = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 24px;
  color: ${(props) => props.theme.colors.mainC};
`;

const ObserverTarget = styled.div`
  width: 100%;
  height: 30px;
`;
