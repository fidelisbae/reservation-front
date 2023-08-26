import React from "react";
import { Layout, Space } from "antd";
import styled from "@emotion/styled";

const { Header, Footer, Sider, Content } = Layout;

const AntdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <StyledHeader>레이아웃 헤더</StyledHeader>
      <StyledContent>{children}</StyledContent>
    </Layout>
  );
};

export default AntdLayout;

const StyledHeader = styled(Header)`
  color: white;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const StyledContent = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
