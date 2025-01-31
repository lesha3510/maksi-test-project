import { User } from '@/entities/user/model/userSlice';
import { SettingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { ColumnsType } from 'antd/es/table';
import UserActions from './components/UserActions';

export const columns: ColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: User, b: User) => a.id - b.id,
    width: 80,
    ellipsis: true,
    align: 'center',
  },
  {
    title: 'Avatar',
    dataIndex: 'name',
    key: 'avatar',
    render: (name: string) => (
      <Avatar style={{ backgroundColor: '#87d068' }}>{name.charAt(0)}</Avatar>
    ),
    width: 80,
    align: 'center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
  },
  {
    title: 'UserName',
    dataIndex: 'userName',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'ZipCode',
    dataIndex: 'zipCode',
    key: 'zipcode',
    sorter: (a: User, b: User) => {
      const zipCodeA = a.zipCode ?? '';
      const zipCodeB = b.zipCode ?? '';
      return parseInt(zipCodeA, 10) - parseInt(zipCodeB, 10);
    },
  },
  {
    title: <SettingOutlined />,
    align: 'center',
    width: 80,
    render: (_, record: User) => <UserActions user={record} />,
  },
];
