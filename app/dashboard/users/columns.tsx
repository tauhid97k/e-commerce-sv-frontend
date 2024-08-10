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
    accessorKey: 'email_verified_at',
  },
  {
    header: 'Joining Date',
    accessorKey: 'created_at',
  },
]
