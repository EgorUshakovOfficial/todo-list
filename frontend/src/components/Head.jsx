import { Helmet } from 'react-helmet-async';

export default function Head({pageTitle}){
    return (
        <Helmet>
            <title>{pageTitle}</title>
        </Helmet>
    );
}