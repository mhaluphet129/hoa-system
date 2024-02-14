import React from "react";

import { ConcernDetalsCardProps } from "@/types";
import { Divider, Modal, Typography } from "antd";

const ConcernDetailsCard = ({
  open,
  close,
  concern,
}: ConcernDetalsCardProps) => {
  return (
    <Modal open={open} onCancel={close} footer={null} width={700}>
      <Typography.Title level={3} style={{ marginBottom: 0 }}>
        Concern Details
      </Typography.Title>
      <Divider style={{ marginTop: 0, marginBottom: 15, color: "#000" }} />
      <Typography.Title level={4} style={{ margin: 0 }}>
        Title
      </Typography.Title>
      <Typography>Febuary 14, 2024</Typography>
      <Typography.Paragraph style={{ marginTop: 10 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        eleifend ex sed nunc suscipit bibendum sed a magna. Pellentesque
        consectetur ultricies justo a cursus. Suspendisse non molestie enim.
        Suspendisse ex elit, lacinia a ante interdum, pulvinar placerat felis.
        Vivamus pretium blandit enim non porta. Etiam et velit libero. Sed
        vestibulum mi ut iaculis tincidunt. Proin sodales sit amet orci sed
        tristique. Suspendisse id pharetra quam. Integer id risus at erat
        pharetra maximus eget ac nulla.
        <br />
        <br />
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aliquam lorem tortor, accumsan ut tellus nec, varius venenatis urna.
        Donec condimentum, diam in ultricies mollis, lorem ligula tristique sem,
        et dapibus purus diam eget justo. Nam at felis ut lacus ornare
        efficitur. Suspendisse imperdiet lobortis odio, eu pellentesque sem
        blandit sit amet. Aenean volutpat blandit imperdiet. Quisque tortor dui,
        aliquam nec ullamcorper ac, scelerisque nec purus. Ut a sollicitudin
        augue. In placerat metus lectus, a sollicitudin nisl porttitor vitae.
      </Typography.Paragraph>
      <Typography>Tarzan Kagubatan</Typography>
      <Typography>Gorordo Avenue, Kamputhaw, Lahug Cebu City</Typography>
      <Typography>+63123456789</Typography>
    </Modal>
  );
};

export default ConcernDetailsCard;
