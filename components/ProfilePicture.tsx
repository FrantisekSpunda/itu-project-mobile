import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { tailwind as taw } from 'react-native-tailwindcss';
import { tw } from './../utils/utils.tailwind';

interface ProfilePictureProps {
	text: string;
}

export const ProfilePicture = ({ text }: ProfilePictureProps) => {
	return (
		<View style={tw('roundedBFull', 'bgGray900', 'wFull', 'flex', 'h8', 'itemsCenter', 'contentCenter', 'w8')}>
			<Text style={tw('textLg', 'fontBold', 'textBlack')}>{text}</Text>j
		</View>
	);
};

export default ProfilePicture;
