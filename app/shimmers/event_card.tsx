import { Card, Skeleton } from "antd";

const EventCardShimmer = () => {
  return (
    <Card
      hoverable
      style={{ width: 220 }}
      cover={<Skeleton.Image style={{ width: 220, height: 180 }} active />}
      styles={{
        body: {
          padding: 10,
        },
      }}
    >
      <Skeleton active />
    </Card>
  );
};

export default EventCardShimmer;
