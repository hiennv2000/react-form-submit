import { Button } from '../_component/Button';
import { BackgrounGradient } from '../_component/BackgrounGradient';
import { Title } from '../_component/Title';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../_component/Input';
import Select from '../_component/Selects';
import { IconChevron, IconEdit, IconRemove } from '../_component/Icons';
import { useState } from 'react';

const selectItems = [
    { value: "country 1" },
    { value: "country 2" },
    { value: "country 3" },
    { value: "country 4" },
]

type FormValues = {
    fullName: string,
    email: string,
    address: string,
    city: string,
    country: string,
}

const Home = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const [formList, setFormList] = useState<any[]>([]);
    const [selectedForms, setSelectedForms] = useState<number[]>([]);
    const methods = useForm()

    const onSubmit = (data: FormValues) => {
        console.log(data);
        setFormList([...formList, data]);
        reset();
    }

    const handleRemove = (index: number) => {
        const updatedFormList = [...formList];
        updatedFormList.splice(index, 1);
        setFormList(updatedFormList);
    };

    const handleRemoveAll = () => {
        setFormList([]);
    };

    const handleCheckAll = (isChecked: boolean) => {
        if (isChecked) {
            const allIndexes = formList.map((_, index) => index);
            setSelectedForms(allIndexes);
        } else {
            setSelectedForms([]);
        }
    };

    const handleCheckItem = (index: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedForms([...selectedForms, index]);
        } else {
            setSelectedForms(selectedForms.filter((item) => item !== index));
        }
    };

    const handleRemoveChecked = () => {
        const updatedFormList = formList.filter((_, index) => !selectedForms.includes(index));
        setFormList(updatedFormList);
        setSelectedForms([]);
    };

    return (
        <section className="isolate bg-white px-5 py-10">
            <BackgrounGradient />
            <Title title="Personal Details" subTitle="Please fill out all the fields." />
            <div className="max-w-3xl mx-auto divide-y divide-gray-300">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-5 md:py-8 first:pt-0 last:pb-0">
                        <Input
                            {...register("fullName", {
                                required: {
                                    value: true,
                                    message: "Don't forget your name!"
                                }
                            })}
                            label="Full Name"
                            placeholder="Enter your name"
                            errorMessage={errors.fullName && errors.fullName.message}
                        />
                        <Input
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Don't forget your email!"
                                }
                            })}
                            label="Email address"
                            placeholder="Enter your email"
                            errorMessage={errors.email && errors.email.message}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
                            <Input
                                {...register("address", {
                                    required: {
                                        value: true,
                                        message: "Don't forget your address / street!"
                                    }
                                })}
                                label="Address / Street"
                                placeholder="Enter your address / street"
                                errorMessage={errors.address && errors.address.message}
                            />
                            <Input
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: "Don't forget your city!"
                                    }
                                })}
                                label="City"
                                placeholder="Enter your city"
                                errorMessage={errors.city && errors.city.message}
                            />
                        </div>

                        <Select
                            name="country"
                            label="Country / region"
                            options={selectItems}
                            placeholder="Select your country"
                            errorMessage={errors.country && errors.country.message}
                        />

                        <Button
                            type="submit"
                            expand="block"
                        >
                            Submit
                        </Button>
                    </form>
                </FormProvider>

                <div className="py-5 md:py-8 first:pt-0 last:pb-0 space-y-1">
                    <div className="border border-[#ff91bf] rounded-xl overflow-hidden">
                        <table className="w-full text-sm md:text-base text-left">
                            <thead className="h-14 text-xs text-black uppercase bg-[#ff91bf] border-b border-[#ff91bf]">
                                <tr>
                                    {formList.length > 0 &&
                                        <th scope="col" className="px-3 py-2" >
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                                    checked={selectedForms.length === formList.length}
                                                    onChange={(e) => handleCheckAll(e.target.checked)}
                                                />
                                                <label htmlFor="checkbox-all" className="sr-only">
                                                    Check All
                                                </label>
                                            </div>
                                        </th>
                                    }
                                    <th scope="col" className="px-3 py-2">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-3 py-2">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-2">
                                        Address
                                    </th>
                                    <th scope="col" className="px-3 py-2">
                                        City
                                    </th>
                                    <th scope="col" className="px-3 py-2">
                                        Country
                                    </th>
                                    <th hidden scope="col" className="px-3 py-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {formList.length <= 0 ?
                                    <tr className="text-center">
                                        <td colSpan={12} className="px-3 py-4">
                                            No data here
                                        </td>
                                    </tr>
                                    :
                                    <>
                                        {formList.map((data: FormValues, index: number) => (
                                            <tr key={index} className="relative bg-white border-b hover:bg-gray-50 group/item">
                                                <td className="px-3 py-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id={`checkbox-table-${index}`}
                                                            type="checkbox"
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                                            checked={selectedForms.includes(index)}
                                                            onChange={(e) => handleCheckItem(index, e.target.checked)}
                                                        />
                                                        <label htmlFor={`checkbox-table-${index}`} className="sr-only">
                                                            Check Item
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4">{data.fullName}</td>
                                                <td className="px-3 py-4">{data.email}</td>
                                                <td className="px-3 py-4">{data.address}</td>
                                                <td className="px-3 py-4">{data.city}</td>
                                                <td className="px-3 py-4">{data.country}</td>
                                                <td className="absolute inset-y-0 right-0 invisible group-hover/item:visible flex items-center justify-end px-3 py-2 space-x-2">
                                                    <Button size="sm" rounded="lg">
                                                        <IconEdit />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        rounded="lg"
                                                        fill="red"
                                                        onClick={() => handleRemove(index)}
                                                    >
                                                        <IconRemove />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>

                    {formList.length > 0 &&
                        <div className="inline-flex items-center gap-x-2 z-20 fixed right-5 top-5">
                            {selectedForms.length > 0 ?
                                <Button
                                    shadow="lg"
                                    size="sm"
                                    fill="red"
                                    rounded="lg"
                                    onClick={handleRemoveChecked}
                                >
                                    <IconRemove /> <span>Remove Selected</span>
                                </Button>
                                :
                                <Button
                                    shadow="lg"
                                    size="sm"
                                    fill="red"
                                    rounded="lg"
                                    onClick={handleRemoveAll}
                                >
                                    <IconRemove /> <span>Remove All</span>
                                </Button>
                            }

                        </div>
                    }
                    {formList.length <= 10 ?
                        <div className="text-end">
                            <span className="text-[#6c61ff]">{formList.length}</span> / <span className="text-black/50">{formList.length}</span>
                        </div>
                        :
                        <div className="flex items-center justify-end space-x-3">
                            <div className="text-end">
                                <span className="text-[#6c61ff]">{formList.length}</span> / <span className="text-black/50">{formList.length}</span>
                            </div>
                            <Button size="sm"><IconChevron className="rotate-180" /></Button>
                            <Button size="sm"><IconChevron className="" /></Button>
                        </div>
                    }
                </div>
            </div>
        </section >
    )
}

export default Home