import React, { useState, useEffect } from 'react'
import {
    Flex,
    Image,
    Text,
    Input,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select,
    Circle,
} from '@chakra-ui/react'

import { useParams } from "react-router";
import * as yup from "yup"
import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../redux/action';
import iconsList from '../../Utility/icon_list_sensor';
import { TabTitle } from '../../Utility/utility'
import { getApiGreenhouse,categoryApi,postSensor } from '../../Utility/api_link';
import axios from 'axios';
import Loading from "../../component/loading/loading";

const schema = yup.object({
    name: yup
        .string()
        .required("Nama harus diisi"),
    icon: yup
        .string()
        .required("icon harus diisi"),
    color: yup
        .string()
        .required("Satuan Ukur harus diisi"),
    brand: yup
        .string()
        .required("Satuan Ukur harus diisi"),
    unit_measurement: yup
        .string()
        .required("Merek harus diisi"),
    max_range: yup
    .number()
    .required("Range Max harus diisi"),
    min_range: yup
    .number()
    .required("Range Min harus diisi"),
    category: yup
     .object().shape({
            id: yup.string().required().nullable(),
     })
     .required("Kategori harus diisi"),
})
const Monitoring_Add = () => {
    TabTitle("Tambah Sensor - ITERA Hero")
    const { id } = useParams();
    const [dataApi, setDataApi] = useState(null);
    const getDataApi = async () => {
        axios.get( getApiGreenhouse + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }}
            )
            .then(response => {
                setDataApi(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const [dataCategory, setDataCategory] = useState(null);
    const getDataCategory = async () => {
        axios.get( categoryApi, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }}
            )
            .then(response => {
                setDataCategory(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    // const postSensor = async (name, icon, color, brand, unit_measurement, max_range, min_range, category) => {
    //     const data = {
    //         name: name,
    //         icon: icon,
    //         color: color,
    //         brand: brand,
    //         unit_measurement: unit_measurement,
    //         max_range: max_range,
    //         min_range: min_range,
    //         category: category,
    //         greenhouse: id
    //     }
    //     await axios.post(postSensor, data, {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('token')
    //         }
    //     })
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    
    
    
    

    // let data = {
    //     name: '',
    //     icon: '',
    //     color: '',
    //     brand: '',
    //     unit_measurement: '',
    //     max_range: '',
    //     min_range: '',
    //     category: 
    //     //     id: '',
    //     //     name: ''
    //     // }
    // }
    const [icon_selected, setIcon_selected] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        getDataCategory()
        getDataApi()
        return () => {
            dispatch(routePageName('Monitoring'))
        };
    }, []);

    return (
        <>
		{dataApi == null ? <Loading/>
:
        <Flex
            w='100%'
            flexDir={'column'}
        >
            <Flex width='100%' >
                <Link to={'/unit/monitoring'}>
                    <Flex marginRight={'2'}>
                        <Text fontWeight={'semibold'} fontSize={'var(--header-3)'} color={'var(--color-primer)'}>
                            List Sensor pada Greenhouse
                        </Text>
                    </Flex>
                </Link>
                <Flex marginRight={'2'}>
                    <Text fontWeight={'semibold'} fontSize={'var(--header-3)'} color={'var(--color-primer)'}> {'>'} </Text>
                </Flex>
                <Link>
                    <Flex>
                        {
                            dataApi.id == id ? (
                                <Text fontWeight={'semibold'} fontSize={'var(--header-3)'} color={'var(--color-primer)'}> {dataApi.name} </Text>
                            ) : (
                                <Text fontWeight={'semibold'} fontSize={'var(--header-3)'} color={'var(--color-primer)'}> {dataApi.name} </Text>
                            )
                        }
                    </Flex>
                </Link>
            </Flex>
            <Formik
                initialValues={{
                    name: '',
                    icon: '',
                    color: '',
                    brand: '',
                    unit_measurement: '',
                    max_range: '',
                    min_range: '',
                    category: {
                        id: '',
                    },
                    id_greenhouse: id
                }
                } validationSchema={schema}
                onSubmit={(values) => {
                    console.log(JSON.stringify(values, null, 2))
                }}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormControl marginTop={'20px'} isInvalid={errors.name && touched.name}>
                            <FormLabel color={'var(--color-primer)'} >
                                Nama
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="Nama..." />
                            <FormErrorMessage>
                                {errors.name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.icon && touched.icon}>
                            <FormLabel color={'var(--color-primer)'}>
                                Icon
                            </FormLabel>
                            <Select color={'var(--color-primer)'}
                                onChange={(e) => {
                                    setFieldValue('icon', e.target.value);
                                    setIcon_selected(e.target.value)
                                }}
                                onBlur={handleBlur}
                                value={values.icon}
                                name="icon"
                                id="icon">
                                <option value="" selected>
                                    Pilih Icon
                                </option>
                                {iconsList.map((item) => (
                                    <option value={item.icon} color={'var(--color-primer)'}>
                                        {item.nama}
                                    </option>
                                )
                                )
                                }
                            </Select>
                            <Flex m={'15px'}>
                                <Image src={icon_selected} />
                            </Flex>
                            <FormErrorMessage>
                                {errors.icon}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.color && touched.color}>
                            <FormLabel color={'var(--color-primer)'}>
                                Warna
                            </FormLabel>
                            <Select
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="text"
                                name="color"
                                value={values.color}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                >
                                <option value="" >
                                    Pilih Warna
                                </option>
                                {iconsList.map((item) => (
                                    <option value={item.color} color={'var(--color-primer)'}>
                                        {item.nama}
                                    </option>
                                )
                                )
                                }
                            </Select>
                            <Flex m={'15px'}>
                                    <Circle bg={values.color} size="30px" />
                            </Flex>
                            <FormErrorMessage>
                                {errors.color}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.unit_measurement && touched.unit_measurement}>
                            <FormLabel color={'var(--color-primer)'}>
                                Satuan Ukur
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="text"
                                name="unit_measurement"
                                value={values.unit_measurement}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="Satuan Ukur..." />
                            <FormErrorMessage>
                                {errors.unit_measurement}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.brand && touched.brand}>
                            <FormLabel color={'var(--color-primer)'}>
                                Merek
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="text"
                                name="brand"
                                value={values.brand}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="brand..." />
                            <FormErrorMessage>
                                {errors.brand}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.min_range && touched.min_range}>
                            <FormLabel color={'var(--color-primer)'}>
                                Range Min
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="number"
                                name="min_range"
                                value={values.min_range}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="min_range..." />
                            <FormErrorMessage>
                                {errors.min_range}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.max_range && touched.max_range}>
                            <FormLabel color={'var(--color-primer)'}>
                                Range Max
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="number"
                                name="max_range"
                                value={values.max_range}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="max_range..." />
                            <FormErrorMessage>
                                {errors.max_range}
                            </FormErrorMessage>
                        </FormControl>
                         <FormControl marginTop={'20px'} isInvalid={errors?.category?.id && touched?.category?.id}>
                            <FormLabel color={'var(--color-primer)'}>
                                Kategori
                            </FormLabel>
                            <Select value={values?.category?.id} color={'var(--color-primer)'} onChange={handleChange}
                                onBlur={handleBlur}
                                name="category.id"
                            >
                                <option value="">
                                    Pilih Kategori
                                </option>
                                {dataCategory.map((item) => (
                                    <option value={item.id} color={'var(--color-primer)'}>
                                        {item.name} 
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage>
                                {errors?.category?.id}
                            </FormErrorMessage>
                        </FormControl>  
                        <FormControl>
                            <Input
                                type="hidden"
                                value={id}
                                name="id_greenhouse"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="id..." />
                        </FormControl>
                        <Link to={'/unit/monitoring'}>
                            <Button
                                marginTop={'44px'}
                                width="100%"
                                height="50px"
                                borderRadius="10px"
                                backgroundColor="var(--color-primer)"
                                type="submit"
                                className="btn-login"
                                onClick={handleSubmit}
                                isLoading={isSubmitting}
                                loadingText="Tunggu Sebentar..."
                            >
                                <Text fontWeight='bold' fontFamily='var(--font-family-secondary)' fontSize='var(--header-3)' color='var(--color-on-primary)'>
                                    Tambah
                                </Text>
                            </Button>
                        </Link>
                    </Form>
                )}
            </Formik>
        </Flex>
        			}
                    </>
    )
}
export default Monitoring_Add