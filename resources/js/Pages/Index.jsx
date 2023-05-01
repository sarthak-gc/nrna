import { Link } from "@inertiajs/react";
import { Button, Space } from "antd";
import React from "react";

export default function Index() {
    return (
        <>
            <div className="container-md mx-auto max-w-screen-md min-h-screen bg-white">
                <div className="logo flex items-center justify-center">
                    <img
                        src="https://nrna.org/wp-content/uploads/2020/08/nrna-297x300.png"
                        alt=""
                    />
                </div>

                <div className="business-links flex justify-center mt-12">
                    <Space
                        direction="vertical"
                        className="w-full px-4 md:w-1/2"
                    >
                        <Link href="/business/create">
                            <Button
                                className="bg-purple-500"
                                type="primary"
                                block
                            >
                                Create New Business
                            </Button>
                        </Link>

                        <Link href="/business">
                            <Button
                                className="bg-violet-500"
                                type="primary"
                                block
                            >
                                View all Business
                            </Button>
                        </Link>
                    </Space>
                </div>
            </div>
        </>
    );
}
