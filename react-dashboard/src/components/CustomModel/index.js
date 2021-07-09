import React, { useState } from "react";
import { Modal, Button, Card, Row, Col, Alert } from "antd";

import { useData } from "../../context/DataContext";

const CustomModel = ({ visible, setVisible, userInfo }) => {
  const [loading, setLoading] = useState(false);
  const { sendPushNotification } = useData();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Make Action"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>
            <div
              onClick={() => {
                let msg = "send police";
                alert(JSON.stringify(userInfo));
              }}
            >
              <Card
                hoverableauto={"true"}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#E5E5E5",
                  margin: "3px",
                  boxShadow: " 0 2px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
                hoverable={true}
              >
                <Card.Meta
                  title={"Send The Police"}
                  description={"send the police to user address "}
                />
              </Card>
            </div>
          </Col>
          <Col span={24}>
            <div
              div
              onClick={() => {
                let msg = {
                  title: 'Medical Report',
                  body: 'please report immediately your medical information',
                  data:{
                    report:'medical-report'
                  }

                } 
                sendPushNotification(userInfo.id, msg);
                alert("medical report alert was send to user");
              }}
            >
              <Card
                hoverableauto={"true"}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#E5E5E5",
                  margin: "3px",
                  boxShadow: " 0 2px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
                hoverable={true}
              >
                <Card.Meta
                  title={"Send Medical Report"}
                  description={"send medical report to user"}
                />
              </Card>
            </div>
          </Col>
          <Col span={24}>
            <div
              div
              onClick={() => {
                let msg = {
                  title: 'Location Report',
                  body: 'please report immediately your location',
                  data:{
                    report:'location-report'
                  }

                } 
                sendPushNotification(userInfo.id, msg);
                alert("location report alert was send to user");
              }}
            >
              <Card
                hoverableauto={"true"}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#E5E5E5",
                  margin: "3px",
                  boxShadow: " 0 2px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
                hoverable={true}
              >
                <Card.Meta
                  title={"Send Location Report"}
                  description={"send location report to user"}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CustomModel;
