import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  InputNumber,
  Row,
  Col,
  message,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddCircle from "../../../orders/assets/add-circle.png";
import DeleteIcon from "../../../../components/deleteIcon";
import {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../../api";
import Spinner from "../../../../components/Spinner";
import Pagination from "../../../../components/Pagination";
import ExpensesCard from "../../components/ExpensesCard";
import moment from "moment";
import { CreateExpenseDataType } from "../../types";

const { RangePicker } = DatePicker;

const Expenses = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    [moment.Moment | null, moment.Moment | null]
  >([null, null]);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["expenses", currentPage, selectedDateRange],
    queryFn: () => {
      const [start_date, end_date] = selectedDateRange;
      return getExpenses(
        currentPage,
        pageSize,
        start_date ? start_date.format("YYYY-MM-DD") : undefined,
        end_date ? end_date.format("YYYY-MM-DD") : undefined
      );
    },
    keepPreviousData: true,
  });

  const createMutation = useMutation({
    mutationFn: (expense: CreateExpenseDataType) => createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "expenses",
        currentPage,
        selectedDateRange,
      ]);
      setIsModalVisible(false);
      message.success("Расходы успешно создают");
      form.resetFields();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateExpenseDataType }) =>
      updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "expenses",
        currentPage,
        selectedDateRange,
      ]);
      setIsModalVisible(false);
      message.success("Расходы успешно обновлены");
      form.resetFields();
      setIsEditMode(false);
      setEditingExpenseId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "expenses",
        currentPage,
        selectedDateRange,
      ]);
      setIsDeleteModalVisible(false);
      message.success("Меню успешно удалено");
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddExpenseClick = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleEditExpenseClick = async (id: string) => {
    setIsEditMode(true);
    setEditingExpenseId(id);
    setIsModalVisible(true);

    try {
      const expense = await getExpenseById(id);
      form.setFieldsValue({
        date: expense.date ? moment(expense.date, "YYYY-MM-DD") : null,
        price: expense.price,
        description: expense.description,
      });
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };

  const handleDeleteExpenseClick = (id: number) => {
    setEditingExpenseId(id.toString());
    setIsDeleteModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          date: values.date.format("YYYY-MM-DD"),
        };
        if (isEditMode && editingExpenseId) {
          updateMutation.mutate({
            id: editingExpenseId,
            data: formattedValues,
          });
        } else {
          createMutation.mutate(formattedValues);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditingExpenseId(null);
  };

  const handleDeleteModalOk = () => {
    if (editingExpenseId) {
      deleteMutation.mutate(parseInt(editingExpenseId));
    }
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setEditingExpenseId(null);
  };

  const handleDateRangeChange = (
    dates: [moment.Moment | null, moment.Moment | null] | null
  ) => {
    setSelectedDateRange(dates || [null, null]);
  };

  return (
    <div>
      <div className="flex items-center py-3 px-6 justify-between bg-white">
        <h2 className="font-sf-pro text-2xl font-semibold leading-[28.64px] text-left">
          Расходы
        </h2>
        <div className="flex items-center gap-4">
          <RangePicker
            className="w-72"
            placeholder={["Start Date", "End Date"]}
            onChange={handleDateRangeChange}
            allowClear
          />
          <Button
            className="flex items-center"
            type="primary"
            onClick={handleAddExpenseClick}
          >
            <img src={AddCircle} alt="plus icon" width={20} height={20} />
            Добавить расход
          </Button>
        </div>
      </div>
      <div className="mt-5">
        {isLoading ? (
          <p>
            <Spinner />
          </p>
        ) : (
          <>
            {data &&
              data?.results &&
              data?.results.map((item) => (
                <ExpensesCard
                  key={item.id}
                  date={item?.date}
                  price={item?.price}
                  description={item?.description}
                  onEdit={() => handleEditExpenseClick(item.id)}
                  onDelete={() => handleDeleteExpenseClick(item.id)}
                />
              ))}
            <Pagination
              currentPage={currentPage}
              totalItems={data?.count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <Modal
        width={739}
        title={isEditMode ? "Редактировать расход" : "Добавить расход"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{ date: "", price: "", description: "" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Выберите дату"
                rules={[{ required: true, message: "Введите дату!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Сумма расхода"
                rules={[{ required: true, message: "Введите цену!" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Комментарий"
            rules={[{ required: true, message: "Введите описание!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <div className="flex items-center justify-end">
            <Button type="primary" onClick={handleModalOk}>
              {isEditMode ? "Сохранить изменения" : "Добавить расход"}{" "}
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={
          <div className="font-sf-pro text-[24px] mb-7 text-[#2F3138]">
            Удалить блюдо
          </div>
        }
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <div className="text-center p-3">
          <div className="mb-5" onClick={handleDeleteModalCancel}>
            <DeleteIcon className="w-[32px]" />
          </div>
          <div>
            <p className="font-sf-pro text-[16px] text-[#2F3138] w-[343px] mx-auto mb-4">
              Вы уверены, что хотите удалить выбранное блюдо из меню?
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={handleDeleteModalCancel}>Отменить</Button>
              <Button onClick={handleDeleteModalOk} danger type="primary">
                Удалить
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Expenses;
