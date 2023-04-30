import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import {
    Row,
    Form,
    Col,
    Input,
    Upload,
    Alert,
    Space,
    Button,
    Select,
    Divider,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import GoogleMapInput from "../../components/GoogleMapInput";
import { router, useForm } from "@inertiajs/react";
import {
    GoogleReCaptcha,
    GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import ReCAPTCHA from "react-google-recaptcha";
export default function CreateBusiness({ flash }) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [logo, setLogo] = useState();

    const { data, setData, post, processing, errors } = useForm({
        business_name: "",
        street_address: "",
        city: "",
        country: "",
        telephone: "",
        email: "",
        latitude: "",
        longitude: "",
        logo: "",
        captcha: "",
    });
    const onValuesChange = (changedFields) => {
        setData(Object.keys(changedFields)[0], Object.values(changedFields)[0]);
    };

    const onFinish = (values) => {
        post("/business", {
            onSuccess: () => {
                form.resetFields();
            },
        });
    };

    const onPlaceAdded = (place) => {
        console.log("place", place.vicinity);
        let country = place.address_components.find((component) =>
            component.types.includes("country")
        );

        console.log(place.geometry.location.lat());
        form.setFieldsValue({
            country: country.short_name,
            street_address: place.formatted_address,
            city: place.vicinity,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
        });
        setData((data) => ({
            ...data,
            country: country.short_name,
            street_address: place.formatted_address,
            city: place.vicinity,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
        }));
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <div className="container max-w-screen-lg mx-auto mt-12 bg-white p-12 shadow-md rounded-md">
                {Object.keys(errors).length > 0 && (
                    <Alert
                        type="error"
                        message={Object.values(errors)[0]}
                        style={{ marginTop: "10px" }}
                    />
                )}
                {flash.message && (
                    <Alert
                        type="success"
                        message="Great Job !!!"
                        description={flash.message}
                        style={{ marginTop: "10px" }}
                        showIcon
                    />
                )}
                <h1 className="font-primary text-xl font-bold mt-4">
                    Add New Business
                </h1>

                <Form
                    form={form}
                    onFinish={onFinish}
                    name="business_form"
                    scrollToFirstError
                    layout="vertical"
                    onValuesChange={onValuesChange}
                >
                    <Row justify={"space-between"} gutter={24}>
                        <Col span={24} md={12}>
                            <Form.Item
                                label={"Business Name"}
                                name={"business_name"}
                                required
                                tooltip={"Enter Business Name"}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your business name",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter business name " />
                            </Form.Item>
                            <Form.Item
                                label={"Email Address"}
                                name={"email"}
                                required
                                tooltip={"Enter Email Address"}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your email address",
                                    },
                                    {
                                        type: "email",
                                        message: "Please input a valid email",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter email address " />
                            </Form.Item>
                            <Form.Item label={"Telephone"} name={"telephone"}>
                                <Input placeholder="Enter telephone number " />
                            </Form.Item>
                            <Form.Item label={"Website"} name={"website"}>
                                <Input placeholder="Enter Business website url " />
                            </Form.Item>
                            <Form.Item
                                label={"Business Logo"}
                                name={"logo"}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please provide a business logo",
                                    },
                                ]}
                            >
                                <Upload
                                    name="logo"
                                    maxCount={1}
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    beforeUpload={(file) => {
                                        setLogo(file);
                                        form.setFieldValue("logo", file);
                                        setData("logo", file);
                                        return false;
                                    }}
                                >
                                    {uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Row justify={"space-between"}>
                                <Col span={24} md={12}>
                                    <Form.Item
                                        label={"Country"}
                                        name={"country"}
                                    >
                                        <Select placeholder="Select Country">
                                            <Option value="np">Nepal</Option>
                                            <Option value="DE">Germany</Option>
                                            <Option value="IN">India</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={24} md={12}>
                                    <Form.Item label={"City"} name={"city"}>
                                        <Input placeholder="Enter City name " />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label={"Street Address"}
                                name={"street_address"}
                            >
                                <Input placeholder="Enter street address" />
                            </Form.Item>

                            <Row justify={"space-between"}>
                                <Col span={24} md={12}>
                                    <Form.Item
                                        label={"Latitude"}
                                        name={"latitude"}
                                    >
                                        <Input placeholder="Latitude" />
                                    </Form.Item>
                                </Col>

                                <Col span={24} md={12}>
                                    <Form.Item
                                        label={"Longitude"}
                                        name={"longitude"}
                                    >
                                        <Input placeholder="Enter Longitude " />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider plain>OR</Divider>

                            <Form.Item label="Select an address to autofill address">
                                <GoogleMapInput onPlaceAdded={onPlaceAdded} />
                            </Form.Item>

                            <Form.Item
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <ReCAPTCHA
                                    sitekey="6Lc4BMUlAAAAAIOZ5ZbGavS5hhXjx-oG9sP6Sx-0"
                                    onChange={(value) => {
                                        setData("captcha", value);
                                        data.setFieldValue("captcha", value);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="text-right mt-4">
                        <Space size="small">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    className="bg-violet-700"
                                    htmlType="submit"
                                    disabled={processing}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Space>
                    </div>
                </Form>
            </div>
        </>
    );
}
