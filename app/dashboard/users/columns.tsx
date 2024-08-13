import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/lib/dataTypes'

export const usersColumns: ColumnDef<User>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Verified At',
    accessorKey: 'emailVerifiedAt',
  },
  {
    header: 'Joining Date',
    accessorKey: 'createdAt',
  },
]
