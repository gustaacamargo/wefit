import { Box } from '@react-native-material/core';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from "react-native"

const EmptyListMessage = ({ message }: { message: string }) => (
    <Box style={{ justifyContent: "center", alignItems: "center" }} pt={16}>
        <Text style={{ fontSize: 16, color: "#070707" }}>{message}</Text>
    </Box>
)

export default EmptyListMessage