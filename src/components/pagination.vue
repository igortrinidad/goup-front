<template>
    <nav id="places-pagination">
        <ul class="pagination places">
            <li title="Anterior" :class="{ disabled: source.current_page == 1 }">
                <a href="#previous" @click="prev($event, source.current_page-1)" :disabled="source.current_page == 1"
                   aria-label="Previous">
                    <small aria-hidden="true"><i class="fa fa-chevron-left"></i></small>
                </a>
            </li>
            <li v-for="page in pages" track-by="$index" :class="{ active: source.current_page == page }">
                <span v-if="page == '...'">{{ page }}</span>
                <span v-if="pages.length == 1">{{ page }}</span>
                <a :href="'#'+page" v-if="page != '...' && pages.length > 1 " @click="navigate($event, page)">{{ page
                    }} </a>
            </li>
            <li title="Proxima" :class="{ disabled: source.current_page == source.last_page }">
                <a href="#next" @click="next($event, source.current_page+1)"
                   :disabled="source.current_page == source.last_page" aria-label="Next">
                    <small aria-hidden="true"><i class="fa fa-chevron-right"></i></small>
                </a>
            </li>
        </ul>
    </nav>
</template>


<script>

    export default {
        name: 'pagination',
        props: ['source', 'range'],

        data () {
            return {
                pages: []
            }
        },

        methods: {

            navigate (ev, page) {
                ev.preventDefault()
                this.$emit('navigate', page)
                $('html, body').stop().animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
            },

            next (ev, page) {
                ev.preventDefault()

                if (page == this.source.last_page + 1 || this.source.current_page == this.source.last_page) {
                    return;
                }

                this.navigate(ev, page)
            },

            prev (ev, page) {
                ev.preventDefault()

                if (page == 0) {
                    return;
                }

                this.navigate(ev, page)
            },

            generatePagesArray (currentPage, collectionLength, rowsPerPage, paginationRange) {

                let pages = []
                let totalPages = Math.ceil(collectionLength / rowsPerPage)
                let halfWay = Math.ceil(paginationRange / 2)
                let ellipsesNeeded = paginationRange < totalPages

                let position
                if (currentPage <= halfWay) {
                    position = 'start'
                } else if (totalPages - halfWay < currentPage) {
                    position = 'end'
                } else {
                    position = 'middle'
                }

                let i = 1

                while (i <= totalPages && i <= paginationRange) {

                    let pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages)
                    let openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'))
                    let closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'))

                    if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                        pages.push('...')
                    } else {
                        pages.push(pageNumber)
                    }

                    i++
                }
                return pages
            },

            calculatePageNumber (i, currentPage, paginationRange, totalPages) {

                let halfWay = Math.ceil(paginationRange / 2)

                if (i === paginationRange) {
                    return totalPages
                } else if (i === 1) {
                    return i
                } else if (paginationRange < totalPages) {
                    if (totalPages - halfWay < currentPage) {
                        return totalPages - paginationRange + i
                    } else if (halfWay < currentPage) {
                        return currentPage - halfWay + i
                    } else {
                        return i
                    }
                } else {
                    return i
                }
            }
        },

        watch: {
            source () {
                let s = this.source

                let range  = this.range ? this.range : 12
                this.pages = this.generatePagesArray(s.current_page, s.total, s.per_page, range)
            }
        }
    }
</script>
<style scoped>
/* Pagination */
#places-pagination .pagination.places > li > a,
#places-pagination .pagination.places > li > span {
    background-color: #fff;
    color: #73C158 !important;
}

#places-pagination .pagination.places > li.active > a,
#places-pagination .pagination.places > li.active > span {
    background-color: #73C158 !important;
    color: #fff !important;
}

#places-pagination .pagination.places > li.disabled > a,
#places-pagination .pagination.places > li.disabled > span {

    color: #ccc !important;
}
</style>
