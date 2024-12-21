import { Helmet, HelmetProvider } from "react-helmet-async"
import NavigationBar from "../components/navigation"
import Footer from "../components/footer"
import { PostLayout } from "../layouts/post/post_"

export const Post = () => {

    return (
        <>
            <HelmetProvider>
                <Helmet> <title>Bài viết</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar />
                </section>

                <div className="wrap-post-page">
                    <PostLayout />
                </div>

                <Footer />

            </HelmetProvider>
        </>
    )
}