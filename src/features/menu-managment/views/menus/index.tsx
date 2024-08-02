import {
  Button,
  Modal,
  Image,
  Upload,
  Input,
  Form,
  Row,
  Col,
  Switch,
  message,
} from "antd";
import { useState, useEffect} from "react";
import { useMutation, useQuery} from "@tanstack/react-query";
import AddCircle from "../../../orders/assets/add-circle.png";
import CoffeeIcon from "../../../../components/barIcon";
import EggsIcon from "../../../../components/breakfastIcon";
import DishIcon from "../../../../components/lunchIcon";
import ChocolateIcon from "../../../../components/snackIcon";
import BrocoliIcon from "../../../../components/ppIcon";
import CakeIcon from "../../../../components/dessertIcon";
import { createMenu, deleteMenu , getFoodById} from "../../api";
import { getFoods } from "../../../orders/api";
// import { useQueryClient } from "@tanstack/react-query";
import { FoodCardProps } from "../../types";
import formatAmount from "../../../../helpers/format-amount";
import MenuCard from "../../components/MenuCard";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile } from "antd/es/upload/interface";
// import { type } from '../../../orders/types/index';
// Kategoriyalar ro'yxati
const categories = [
  { label: "Завтраки", value: "breakfast", icon: <EggsIcon /> },
  { label: "Обеды", value: "lunch", icon: <DishIcon /> },
  { label: "Бар", value: "bar", icon: <CoffeeIcon /> },
  { label: "Перекусы", value: "snack", icon: <ChocolateIcon /> },
  { label: "ПП", value: "proper_nutrition", icon: <BrocoliIcon /> },
  { label: "Десерты", value: "dessert", icon: <CakeIcon /> },
];

const Menus = () => {
   const [selectedCategory, setSelectedCategory] = useState<string>(
     categories[0].value
   );
   const [selectedModalCategory, setSelectedModalCategory] = useState<string>(
     categories[0].value
   );
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [form] = Form.useForm();
   const [image, setImage] = useState<string | null>(null);
   const [showActions, setShowActions] = useState<boolean>(false);
   const [uploadKey, setUploadKey] = useState<number>(Date.now());
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const [menuId, setMenuId] = useState<number | null>(null);
   
  //  const queryClient = useQueryClient();

   // Ma'lumotlarni olish uchun useQuery
   const { data: foods = [], refetch } = useQuery({
     queryKey: ["foods"],
     queryFn: getFoods,
   });

  //  const { data: foodData, refetch: refetchFoodData } = useQuery({
  //    queryKey: ["food", menuId],
  //    queryFn: () => (menuId ? getFoodById(menuId) : Promise.resolve(null)),
  //    enabled: !!menuId,
  //  });

  //  useEffect(() => {
  //    if (foodData) {
  //      form.setFieldsValue({
  //        title: foodData.name,
  //        input1: foodData.count,
  //        input2: foodData.price,
  //        is_active: foodData.is_active,
  //      });
  //      setImage(foodData.image);
  //      setSelectedModalCategory(foodData.category);
  //      setShowActions(true);
  //    }
  //  }, [foodData, form]);

   const showModal = (menu?: FoodCardProps) => {
     if (menu) {
       setMenuId(menu.id);
       setIsModalVisible(true);
     } else {
       form.resetFields();
       setImage(null);
       setShowActions(false);
       setSelectedModalCategory(categories[0].value);
       setMenuId(null);
       setIsModalVisible(true);
     }
   };

   const handleCancel = () => {
     setIsModalVisible(false);
   };

   const createMutation = useMutation({
     mutationFn: async (formData: FormData) => {
       return createMenu(formData);
     },
     onSuccess: () => {
       message.success("Блюдо успешно создано");
       form.resetFields();
       setIsModalVisible(false);
       refetch();
     },
     onError: (error: any) => {
       if (error.response && error.response.data && error.response.data.name) {
         message.error("Название блюда уже существует");
       } else if (
         error.response &&
         error.response.data &&
         error.response.data.image
       ) {
         message.error("Пожалуйста, добавьте изображение блюда");
       } else {
         message.error(
           "Произошла ошибка при создании меню, попробуйте еще раз."
         );
       }
     },
   });

  //  const updateMutation = useMutation({
  //    mutationFn: (data: { id: number; data: FoodCardProps }) =>
  //      updateMenu(data.id, data.data),
  //    onSuccess: () => {
  //      message.success("Меню успешно обновлено");
  //      refetch();
  //      queryClient.invalidateQueries(["food", menuId]);
  //      setIsModalVisible(false);
  //    },
  //    onError: (error: any) => {
  //      if (error.response && error.response.data && error.response.data.name) {
  //        message.error("Название блюда уже существует");
  //      } else if (
  //        error.response &&
  //        error.response.data &&
  //        error.response.data.image
  //      ) {
  //        message.error("Пожалуйста, добавьте изображение блюда");
  //      } else {
  //        message.error(
  //          "Произошла ошибка при обновлении меню, попробуйте еще раз."
  //        );
  //      }
  //    },
  //  });

   const deleteMutation = useMutation({
     mutationFn: (id: number) => deleteMenu(id),
     onSuccess: () => {
       message.success("Меню успешно удалено");
       refetch();
     },
     onError: (error) => {
       message.error("Произошла ошибка при удалении меню, попробуйте еще раз.");
     },
   });

   const handleSubmit = (values: any) => {
     const formData = new FormData();
     formData.append("name", values.title);
     formData.append("price", values.input2);
     formData.append("count", values.input1);
     formData.append("category", selectedModalCategory);
     formData.append("is_active", values.is_active);
     if (fileList.length > 0) {
       formData.append("image", fileList[0].originFileObj as RcFile);
     }

     if (menuId) {
       updateMutation.mutate({
         id: menuId,
         data: { ...values, category: selectedModalCategory },
       });
     } else {
       createMutation.mutate(formData);
     }
   };

   const handleChange = (info: UploadChangeParam) => {
     if (info.fileList.length > 0) {
       const file = info.fileList[0].originFileObj as RcFile;
       if (file) {
         const isImage = file.type.startsWith("image/");
         if (!isImage) {
           message.error("Fayl turi rasm bo'lishi kerak!");
           return;
         }

         const isLt10M = file.size / 1024 / 1024 < 10;
         if (!isLt10M) {
           message.error("Rasm hajmi 10MB dan oshmasligi kerak!");
           return;
         }

         const reader = new FileReader();
         reader.onloadend = () => {
           const imageUrl = reader.result as string;
           setImage(imageUrl);
           setShowActions(true);
         };
         reader.readAsDataURL(file);
       }
     }
     setFileList(info.fileList);
   };

   const handleDelete = () => {
     setImage(null);
     setShowActions(false);
     setFileList([]);
   };

   const handleUpdate = (id: number) => {
     const menu = foods.find((food) => food.id === id);
     if (menu) showModal(menu);
   };

   const filteredFoods = foods.filter(
     (food) => food.category === selectedCategory
   );


  return (
    <div>
      <div className="flex items-center justify-between px-6 py-3 bg-white">
        <h2 className="font-sf-pro text-2xl font-semibold leading-[28.64px] text-left">
          Управление меню
        </h2>
        <Button
          type="primary"
          className="font-sf-pro-display text-[14px] font-medium leading-[16.71px] text-left py-[10px] ml-2"
          onClick={showModal}
        >
          <img src={AddCircle} alt="add icon" width={20} height={20} />
          Добавить блюдо
        </Button>
      </div>
      <div className="flex items-center justify-between px-6 my-3">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(item.value)}
            className={`w-[218px] px-[16px] py-[8px] font-sf-pro rounded-[5px] flex items-center gap-3 border border-[#edebeb] cursor-pointer text-lg font-medium leading-[19.09px] text-left hover:text-[#5566FF] hover:border-[#5566FF] ${
              selectedCategory === item.value
                ? "bg-gray-100 text-[#5566FF]"
                : "bg-white"
            }`}
            style={{
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {filteredFoods.map((food) => (
          <MenuCard
            key={food?.id}
            id={food?.id}
            name={food?.name}
            count={food?.count}
            price={food?.price}
            image={food?.image}
            is_active={food?.is_active}
            formatAmount={formatAmount}
            onUpdate={()=>{}}
            onDelete={deleteMutation.mutate}
          />
        ))}
      </div>

      <Modal
        width={1000}
        title={menuId ? "Изменить блюдо" : "Добавить блюдо"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <div className="flex items-center gap-[30px] mt-5">
            <div className="flex flex-col items-center">
              <Image src={image} width={120} height={120} />
            </div>
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false}
              onChange={handleChange}
              className="w-[372px]"
              showUploadList={false}
              fileList={fileList}
              key={uploadKey}
            >
              <a className="font-sf-pro text-blue-500">
                {showActions ? (
                  <div className="mt-3 flex space-x-2 flex items-center">
                    <Button
                      className="font-sf-pro text-[14px]"
                      onClick={handleUpdate}
                      type="link"
                    >
                      Изменить
                    </Button>
                    <span className="text-black"> | </span>
                    <Button
                      className="font-sf-pro text-[14px]"
                      onClick={handleDelete}
                      type="link"
                      danger
                    >
                      Удалить
                    </Button>
                  </div>
                ) : (
                  "Добавить изображение"
                )}
              </a>
              <p className="font-sf-pro mt-3 text-[#7D848B]">
                Загрузите изображение блюда в формате .png, .jpg, .jpeg.
                Максимальный размер файла 10MB.
              </p>
            </Upload>
          </div>
          <div className="flex items-center justify-between mt-3 mb-5">
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedModalCategory(item.value)}
                className={`w-[140px] px-[16px] py-[8px] font-sf-pro rounded-[5px] flex items-center gap-3 border border-[#edebeb] cursor-pointer text-lg font-medium leading-[19.09px] text-left hover:text-[#5566FF] hover:border-[#5566FF] ${
                  selectedModalCategory === item.value
                    ? "bg-gray-100 text-[#5566FF]"
                    : "bg-white"
                }`}
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
          <Form.Item
            label="Название блюда"
            name="title"
            rules={[{ required: true, message: "Введите название блюда" }]}
          >
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Количество"
                name="input1"
                rules={[{ required: true, message: "Введите количество" }]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Цена"
                name="input2"
                rules={[{ required: true, message: "Введите цену" }]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="is_active"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  {menuId ? "Обновить блюдо" : "Добавить блюдо"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Menus;
