import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormValue = {
    name: string;
    mobile: string;
    nationalCode: string;
    instagram: string;
};

const nationalCodeValidator = (nationalCode: string) => {
    let sameNumbers = [
        "0000000000",
        "1111111111",
        "2222222222",
        "3333333333",
        "4444444444",
        "5555555555",
        "6666666666",
        "7777777777",
        "8888888888",
        "9999999999",
    ];
    if (nationalCode.length != 10 || sameNumbers.includes(nationalCode)) {
        return false;
    }
    let control = 0;
    let parity = +nationalCode[9];

    for (let i = 0; i < 9; i++) {
        control += +nationalCode[i] * (10 - i);
    }
    control = control % 11;
    if (
        (control < 2 && parity == control) ||
        (control >= 2 && 11 - control == parity)
    ) {
        return true;
    } else {
        return false;
    }
};

let checkInstagramId = () =>
    new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            Math.random() * 10 > 5 ? resolve(true) : resolve(false);
        }, 2000);
    });

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValue>();

    return (
        <form
            className="form"
            onSubmit={handleSubmit((data) => {
                console.log(data);
            })}
        >
            <div className="container">
                <div>
                    <div className="item">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", {
                                required: "This is required",
                                pattern: {
                                    value: /^([^0-9]*)$/,
                                    message: "only use char",
                                },
                                minLength: {
                                    value: 3,
                                    message: "At least 3 characters",
                                },
                            })}
                        />
                    </div>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div>
                    <div className="item">
                        <label htmlFor="mobile">Mobile Number:</label>
                        <input
                            type="text"
                            id="mobile"
                            {...register("mobile", {
                                required: "This is required",
                                minLength: {
                                    value: 11,
                                    message: "Minimum 11 characters",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Maximum 11 characters",
                                },
                                pattern: {
                                    value: /^09/,
                                    message: "start with 09",
                                },
                            })}
                        />
                    </div>
                    {errors.mobile && <p>{errors.mobile.message}</p>}
                </div>

                <div>
                    <div className="item">
                        <label htmlFor="nationalCode">National Code:</label>
                        <input
                            type="text"
                            id="nationalCode"
                            {...register("nationalCode", {
                                required: "This is required",
                                validate: nationalCodeValidator,
                            })}
                        />
                    </div>
                    {errors.nationalCode &&
                        errors.nationalCode.type === "validate" && (
                            <p>Your national code is wrong</p>
                        )}
                </div>

                <div>
                    <div className="item">
                        <label htmlFor="instagram">Instagram Id:</label>
                        <input
                            type="text"
                            id="instagram"
                            {...register("instagram", {
                                required: "This is required",
                                validate: checkInstagramId,
                            })}
                        />
                    </div>
                    {errors.instagram &&
                        errors.instagram.type === "validate" && (
                            <p>"your id is true"</p>
                        )}
                </div>
                <div className="btn-container">
                    <input className="btn" type="submit" value="Submit" />
                </div>
            </div>
        </form>
    );
}

export default App;
