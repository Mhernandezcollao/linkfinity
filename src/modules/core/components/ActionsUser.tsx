import { Card, CardBody } from '@heroui/card';
import { Listbox, ListboxItem } from '@heroui/listbox';
import { TbLogout, TbUserEdit } from 'react-icons/tb';

export const ActionsUser = () => {
    return (
        <Card className="w-[300px] bg-white shadow-lg border-[1px] border-gray-200" shadow="none">
            <CardBody>
                <Listbox aria-label="Listbox menu with sections" variant="flat">
                    <ListboxItem
                        key="edit"
                        startContent={<TbUserEdit size={20} />}
                        description="Allows you to edit the file"
                    >
                        Editar perfil
                    </ListboxItem>
                    <ListboxItem
                        className="text-danger "
                        color="danger"
                        startContent={<TbLogout size={22}/>}
                        description="Finalizar la sesión"
                    >
                        Cerrar sesión
                    </ListboxItem>
                </Listbox>
            </CardBody>
        </Card>
      );
}
