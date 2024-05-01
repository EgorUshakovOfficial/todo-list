import { Fragment } from "react";
import { Box, IconButton, Tooltip, Input, Text} from "@chakra-ui/react";
import {EditIcon, CheckIcon, CloseIcon} from '@chakra-ui/icons';

export default function EditField({
    fieldName,
    fieldObj,
    fieldOnChange,
    fieldOnClick,
    updateFieldValueOnClick
}){
    return (
        <Box
            display="flex"
            alignItems="center"
            gap="0.5em"
        >
            {fieldObj.isReadOnly ?
                <Fragment>
                    <Text>{fieldObj.value}</Text>
                    <Tooltip label={`Edit ${fieldName}`}>
                        <IconButton
                            icon={<EditIcon />}
                            onClick={fieldOnClick}
                        />
                    </Tooltip>
                </Fragment>
                :
                <Fragment>
                    <Input
                        value={fieldObj.value}
                        onChange={fieldOnChange}
                    />
                    <Box
                        display="flex"
                        gap="0.25em"
                    >
                        <Tooltip label={`Save ${fieldName}`}>
                            <IconButton
                                icon={<CheckIcon />}
                                onClick={updateFieldValueOnClick}
                            />
                        </Tooltip>
                        <Tooltip label={`Dismiss ${fieldName}`}>
                            <IconButton
                                icon={<CloseIcon />}
                                onClick={fieldOnClick}
                            />
                        </Tooltip>
                    </Box>
                </Fragment>
            }

        </Box>
    );
}