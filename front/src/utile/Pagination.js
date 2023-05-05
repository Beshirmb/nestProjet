import React, { Fragment , useState , useEffect } from "react";


const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
	let i = from;
	const range = [];

	while (i <= to) {
		range.push(i);
		i += step;
	}

	return range;
};

const Pagination  = (props)  =>{
	const [state, setState] = useState(1)
		const {
			totalRecords ,
			pageLimit ,
			pageNeighbours ,
			row
		} = props;
		let limitepage = typeof pageLimit === "number" ? pageLimit : 30;
		let TotalRecords = typeof totalRecords === "number" ? totalRecords : 0;

		let pageNeighbour =
			typeof pageNeighbours === "number"
				? Math.max(0, Math.min(pageNeighbours, 2))
				: 0;

		let totalPages = Math.ceil(TotalRecords / limitepage);

	

	useEffect(() => {
        gotoPage(state);
    }, [state,totalRecords,row])
	
	

	const gotoPage = page => {
		const { onPageChanged } = props;

		const currentPage = Math.max(0, Math.min(page, totalPages));

		const paginationData = {
			currentPage,
			totalPages: totalPages,
			pageLimit: pageLimit,
			totalRecords: totalRecords
		};

		setState(currentPage)
      onPageChanged(paginationData);
	};

const 	handleClick = (page, evt) => {
		evt.preventDefault();
		gotoPage(page);
	};

const 	handleMoveLeft = evt => {
		evt.preventDefault();
		gotoPage(state - pageNeighbours * 2 - 1);
	};

const 	handleMoveRight = evt => {
		evt.preventDefault();
		gotoPage(state + pageNeighbours * 2 + 1);
	};

	const fetchPageNumbers = () => {
		
		const currentPage = state;

		const totalNumbers = pageNeighbours * 2 + 3;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			let pages = [];

			const leftBound = currentPage - pageNeighbours;
			const rightBound = currentPage + pageNeighbours;
			const beforeLastPage = totalPages - 1;

			const startPage = leftBound > 2 ? leftBound : 2;
			const endPage =
				rightBound < beforeLastPage ? rightBound : beforeLastPage;

			pages = range(startPage, endPage);

			const pagesCount = pages.length;
			const singleSpillOffset = totalNumbers - pagesCount - 1;

			const leftSpill = startPage > 2;
			const rightSpill = endPage < beforeLastPage;

			const leftSpillPage = LEFT_PAGE;
			const rightSpillPage = RIGHT_PAGE;

			if (leftSpill && !rightSpill) {
				const extraPages = range(
					startPage - singleSpillOffset,
					startPage - 1
				);
				pages = [leftSpillPage, ...extraPages, ...pages];
			} else if (!leftSpill && rightSpill) {
				const extraPages = range(
					endPage + 1,
					endPage + singleSpillOffset
				);
				pages = [...pages, ...extraPages, rightSpillPage];
			} else if (leftSpill && rightSpill) {
				pages = [leftSpillPage, ...pages, rightSpillPage];
			}

			return [1, ...pages, totalPages];
		}

		return range(1, totalPages);
	};
	if (!totalRecords) return null;

		if (totalPages === 1) return null;

		
		const pages = fetchPageNumbers();

	

		return (
			<Fragment>
				<nav aria-label="Pagination">
					<ul className="pagination">
						<li  className="page-item">
										<a
											className="page-link"
											href="#"
											aria-label="Previous"
											onClick={handleMoveLeft}
										>
											<span aria-hidden="true">
												&laquo;
											</span>
											<span className="sr-only">
												Previous
											</span>
										</a>
									</li>
						{pages.map((page, index) => {
							return (

								<li
									key={index}
									className={`page-item${
										state === page ? " active" : ""
									}`}
								>
									<a
										className="page-link"
										href="#"
										onClick={e => handleClick(page, e)}
									>
										{page}
									</a>
								</li>
							);
						})}
									<li  className="page-item">
										<a
											className="page-link"
											href="#"
											aria-label="Next"
											onClick={handleMoveRight}
										>
											<span aria-hidden="true">
												&raquo;
											</span>
											<span className="sr-only">
												Next
											</span>
										</a>
									</li>
								
					</ul>
				</nav>
			</Fragment>
		);
	
}



export default Pagination;
