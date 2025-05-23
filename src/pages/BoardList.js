import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backBtn from "../assets/backBtn.svg";
import dropdownArrow from "../assets/dropdown.svg";
import writeIcon from "../assets/write.svg";
import useBoardInfinite from "../hooks/useBoardInfinite";

const BoardList = () => {
  const navigate = useNavigate();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("최신순");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const observerRef = useRef();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBoardInfinite(sortOption);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

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
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSortClick = () => {
    setSortOpen((prev) => !prev);
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY.MM.DD. HH:mm");
  };

  return (
    <Container isAdmin={isAdmin}>
      <HeaderAndSortWrapper>
        <Header>
          <Title>게시글 목록</Title>
          {isAdmin && (
            <BackButton onClick={() => navigate("/admin")}>
              <img src={backBtn} alt="뒤로가기" />
            </BackButton>
          )}
        </Header>

        <SortBar>
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
      </HeaderAndSortWrapper>

      <ListContainer>
        {posts.map((post, idx) => (
          <ListItem
            key={post.id + "-" + idx}
            onClick={() => navigate(`/boardList/${post.id}`)}
          >
            <ItemTitle>{post.title}</ItemTitle>
            <ItemContent>{post.content}</ItemContent>
            <ItemDate>작성일 {formatDate(post.createdAt)}</ItemDate>
          </ListItem>
        ))}
        {hasNextPage && <ObserverTarget ref={observerRef} />}
      </ListContainer>

      {isAdmin && (
        <WriteButton onClick={() => navigate("/boardPost")}>
          <img src={writeIcon} alt="게시글 작성" />
        </WriteButton>
      )}
    </Container>
  );
};

export default BoardList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${(props) => (props.isAdmin ? "100vh" : "93vh")};
  background-color: ${(props) => props.theme.colors.gray};
`;

const HeaderAndSortWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
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
  margin: 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 12px;
`;

const SortBar = styled.div`
  height: 48px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 20px;
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
  width: 12px;
  height: 6px;
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
  width: 100%;
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const ListItem = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 20px;
  padding-top: 24px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const ItemTitle = styled.h2`
  ${(props) => props.theme.fonts.semiBold};
  margin-bottom: 8px;
`;

const ItemContent = styled.p`
  ${(props) => props.theme.fonts.regular};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black2};
  margin-bottom: 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemDate = styled.p`
  ${(props) => props.theme.fonts.regular};
  font-size: 12px;
  color: ${(props) => props.theme.colors.gray2};
`;

const WriteButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.mainC};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 31px;
    height: 31px;
  }
`;

const ObserverTarget = styled.div`
  width: 100%;
  height: 30px;
`;
