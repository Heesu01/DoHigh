import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createPost } from "../../api/BoardApi";
import backBtn from "../../assets/backBtn.svg";
import ConfirmModal from "../../components/Modal";

const BoardPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isButtonDisabled =
    title.trim().length === 0 || content.trim().length === 0;

  const handleSubmit = async () => {
    if (isButtonDisabled || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createPost(title, content);
      alert("게시글이 작성되었습니다.");
      navigate("/boardList");
    } catch (error) {
      console.error("게시글 작성 실패:", error.message);
      alert("게시글 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackButton = () => {
    setCancelModalOpen(true);
  };

  const handleCancelPost = () => {
    setCancelModalOpen(false);
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackButton}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>게시글 작성</HeaderTitle>
      </Header>

      <Content>
        <InputContainer>
          <Label>제목</Label>
          <TextInput
            type="text"
            placeholder="제목을 작성해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Label>내용</Label>
          <TextArea
            placeholder="본문을 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </InputContainer>
      </Content>

      <SubmitButton
        type="button"
        disabled={isButtonDisabled || isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? "작성 중..." : "작성 완료"}
      </SubmitButton>

      <ConfirmModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelPost}
        title="게시글 작성을 취소하시겠습니까?"
        subtitle="작성하시던 내용은 삭제됩니다."
      />
    </Container>
  );
};

export default BoardPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  position: relative;
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

const HeaderTitle = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-top: 26px;
  gap: 24px;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
  margin-bottom: 6px;
  margin-left: 4px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  border: none;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.mainC};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 14px 20px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  border: none;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.mainC};
  }
`;

const SubmitButton = styled.button`
  width: 90%;
  margin: auto;
  padding: 14px;
  max-width: 400px;
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  border-radius: 50px;
  background: ${(props) =>
    props.disabled ? props.theme.colors.btnGray : props.theme.colors.btn};
  color: ${(props) => (props.disabled ? "#d3d3d5" : "#FFFFFF")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: auto;
  margin-bottom: 73px;
`;
