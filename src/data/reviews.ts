import type { Review } from './types';

export const reviews: Review[] = [
  // ── tc-1 (popular — 5 reviews) ──────────────────────────────────────────
  { id: 'r-001', productId: 'tc-1', name: 'Ananya Sharma', rating: 5, date: '2024-01-14', comment: 'Keeps water wonderfully cool in summer. Absolutely love the earthy flavour.', verified: true },
  { id: 'r-002', productId: 'tc-1', name: 'Ramesh Gupta', rating: 4, date: '2024-02-03', comment: 'Beautiful craftsmanship. Slightly smaller than I expected.', verified: true },
  { id: 'r-003', productId: 'tc-1', name: 'Priya Menon', rating: 5, date: '2024-03-18', comment: 'This carafe is a conversation starter every time we have guests.', verified: true },
  { id: 'r-004', productId: 'tc-1', name: 'Vikram Reddy', rating: 4, date: '2024-05-22', comment: 'Good quality terracotta. Packaging was excellent.', verified: false },
  { id: 'r-005', productId: 'tc-1', name: 'Sunita Devi', rating: 5, date: '2024-07-10', comment: "Reminds me of my grandmother's matka. So nostalgic.", verified: true },

  // ── bp-1 (popular — 5 reviews) ──────────────────────────────────────────
  { id: 'r-006', productId: 'bp-1', name: 'Meera Joshi', rating: 5, date: '2024-01-28', comment: 'Stunning blue pottery vase. The colour is even more vivid in person.', verified: true },
  { id: 'r-007', productId: 'bp-1', name: 'Arjun Patel', rating: 4, date: '2024-02-15', comment: 'Lovely piece for our living room. Minor glaze imperfection but adds character.', verified: true },
  { id: 'r-008', productId: 'bp-1', name: 'Kavita Rao', rating: 5, date: '2024-04-09', comment: 'Bought as a housewarming gift and it was perfect.', verified: true },
  { id: 'r-009', productId: 'bp-1', name: 'Rohit Saxena', rating: 4, date: '2024-06-01', comment: 'Authentic Jaipur craft. Worth every rupee.', verified: false },
  { id: 'r-010', productId: 'bp-1', name: 'Deepa Nair', rating: 3, date: '2024-07-20', comment: 'Beautiful but a bit fragile. Handle with care during delivery.', verified: true },

  // ── hs-1 (popular — 6 reviews) ──────────────────────────────────────────
  { id: 'r-011', productId: 'hs-1', name: 'Lakshmi Iyer', rating: 5, date: '2024-01-05', comment: 'The silk is so soft and the weave is flawless. A treasure.', verified: true },
  { id: 'r-012', productId: 'hs-1', name: 'Neha Agarwal', rating: 5, date: '2024-02-20', comment: 'Wore this to a wedding and received so many compliments!', verified: true },
  { id: 'r-013', productId: 'hs-1', name: 'Farida Begum', rating: 4, date: '2024-03-14', comment: 'Gorgeous handloom piece. Colours are rich and vibrant.', verified: true },
  { id: 'r-014', productId: 'hs-1', name: 'Pooja Mishra', rating: 5, date: '2024-05-02', comment: 'This is exactly the kind of authentic craft I was looking for.', verified: false },
  { id: 'r-015', productId: 'hs-1', name: 'Sanjay Kumar', rating: 4, date: '2024-06-18', comment: 'Bought for my wife. She loves the intricate border work.', verified: true },
  { id: 'r-016', productId: 'hs-1', name: 'Divya Pillai', rating: 5, date: '2024-08-05', comment: 'Museum-quality weaving at a fair price. Supporting artisans directly feels great.', verified: true },

  // ── hs-5 (popular — 5 reviews) ──────────────────────────────────────────
  { id: 'r-017', productId: 'hs-5', name: 'Aarti Deshmukh', rating: 5, date: '2024-02-12', comment: 'The ikat pattern is mesmerising. Each motif is perfectly aligned.', verified: true },
  { id: 'r-018', productId: 'hs-5', name: 'Rajesh Tiwari', rating: 4, date: '2024-04-06', comment: 'High quality fabric. Delivery took a bit longer than expected.', verified: true },
  { id: 'r-019', productId: 'hs-5', name: 'Smita Kulkarni', rating: 5, date: '2024-05-29', comment: 'Perfect drape and the handloom texture is unmistakable.', verified: true },
  { id: 'r-020', productId: 'hs-5', name: 'Manoj Verma', rating: 4, date: '2024-07-14', comment: 'Gifted this to my mother. She was thrilled with the quality.', verified: false },
  { id: 'r-021', productId: 'hs-5', name: 'Pallavi Sen', rating: 5, date: '2024-08-22', comment: 'Absolutely stunning. You can feel the hours of work in every thread.', verified: true },

  // ── dk-1 (popular — 5 reviews) ──────────────────────────────────────────
  { id: 'r-022', productId: 'dk-1', name: 'Suresh Barik', rating: 5, date: '2024-01-20', comment: 'The Dhokra horse is magnificent. A true tribal art masterpiece.', verified: true },
  { id: 'r-023', productId: 'dk-1', name: 'Tanvi Bhatt', rating: 4, date: '2024-03-07', comment: 'Solid and weighty. Looks incredible on our mantelpiece.', verified: true },
  { id: 'r-024', productId: 'dk-1', name: 'Gopal Sahu', rating: 5, date: '2024-04-25', comment: 'Each piece is unique because of the lost-wax process. Love this art form.', verified: true },
  { id: 'r-025', productId: 'dk-1', name: 'Nisha Chauhan', rating: 5, date: '2024-06-13', comment: 'Bought two — one for us and one as a corporate gift. Both recipients delighted.', verified: true },
  { id: 'r-026', productId: 'dk-1', name: 'Amit Das', rating: 4, date: '2024-08-01', comment: 'Beautiful detailing. The patina finish is gorgeous.', verified: false },

  // ── ct-6 (popular — 4 reviews) ──────────────────────────────────────────
  { id: 'r-027', productId: 'ct-6', name: 'Ritu Srivastava', rating: 5, date: '2024-02-28', comment: 'My kids adore these Channapatna toys. Safe and beautifully painted.', verified: true },
  { id: 'r-028', productId: 'ct-6', name: 'Harish Hegde', rating: 4, date: '2024-04-15', comment: 'Vibrant colours and smooth finish. Great gift for children.', verified: true },
  { id: 'r-029', productId: 'ct-6', name: 'Swati Pandey', rating: 5, date: '2024-06-22', comment: 'So much better than plastic toys. Love supporting traditional crafts.', verified: true },
  { id: 'r-030', productId: 'ct-6', name: 'Kiran Patil', rating: 4, date: '2024-08-10', comment: 'Sturdy and colourful. Perfect for a return gift set.', verified: false },

  // ── wd-3 (popular — 5 reviews) ──────────────────────────────────────────
  { id: 'r-031', productId: 'wd-3', name: 'Ashok Mehra', rating: 5, date: '2024-01-30', comment: "The wood carving is exquisite. You can see the master craftsman's touch.", verified: true },
  { id: 'r-032', productId: 'wd-3', name: 'Geeta Ranganathan', rating: 4, date: '2024-03-22', comment: 'Lovely piece of folk art. Wood grain adds natural beauty.', verified: true },
  { id: 'r-033', productId: 'wd-3', name: 'Prakash Jain', rating: 5, date: '2024-05-10', comment: 'Fantastic quality. The sandalwood scent is a delightful bonus.', verified: true },
  { id: 'r-034', productId: 'wd-3', name: 'Bhavna Shah', rating: 4, date: '2024-07-04', comment: 'Makes our bookshelf look so much more interesting.', verified: true },
  { id: 'r-035', productId: 'wd-3', name: 'Dinesh Yadav', rating: 5, date: '2024-08-18', comment: 'Ordered the large size. It is a showpiece all on its own.', verified: false },

  // ── cn-4 (popular — 4 reviews) ──────────────────────────────────────────
  { id: 'r-036', productId: 'cn-4', name: 'Savita Naik', rating: 5, date: '2024-02-08', comment: 'Channapatna lacquerware at its best. Rich colours and flawless finish.', verified: true },
  { id: 'r-037', productId: 'cn-4', name: 'Venkatesh Murthy', rating: 4, date: '2024-04-19', comment: 'Solid build quality. The lathe work is very precise.', verified: true },
  { id: 'r-038', productId: 'cn-4', name: 'Anjali Kapoor', rating: 5, date: '2024-06-30', comment: 'These make wonderful housewarming gifts. Ordered a second set.', verified: true },
  { id: 'r-039', productId: 'cn-4', name: 'Raghav Bhatia', rating: 4, date: '2024-08-15', comment: 'Good value for handcrafted items. Arrived well-packaged.', verified: false },

  // ── je-1 (popular — 5 reviews) ──────────────────────────────────────────
  { id: 'r-040', productId: 'je-1', name: 'Shreya Chatterjee', rating: 5, date: '2024-01-12', comment: 'The filigree work is breathtaking. So delicate and detailed.', verified: true },
  { id: 'r-041', productId: 'je-1', name: 'Mamta Singh', rating: 5, date: '2024-03-05', comment: 'I wore these earrings to a sangeet and everyone asked where I got them.', verified: true },
  { id: 'r-042', productId: 'je-1', name: 'Nitin Goswami', rating: 4, date: '2024-04-28', comment: 'Beautiful craftsmanship. Slightly heavier than expected but still comfortable.', verified: true },
  { id: 'r-043', productId: 'je-1', name: 'Rekha Prasad', rating: 5, date: '2024-06-15', comment: 'Authentic tribal silver jewelry. Looks stunning with ethnic wear.', verified: false },
  { id: 'r-044', productId: 'je-1', name: 'Aisha Khan', rating: 4, date: '2024-08-08', comment: 'Great everyday piece. The oxidised finish is very chic.', verified: true },

  // ── kd-2 (popular — 4 reviews) ──────────────────────────────────────────
  { id: 'r-045', productId: 'kd-2', name: 'Shalini Dubey', rating: 5, date: '2024-02-18', comment: 'The brass thali set is gorgeous. Perfect for festive meals.', verified: true },
  { id: 'r-046', productId: 'kd-2', name: 'Pankaj Tripathi', rating: 4, date: '2024-04-12', comment: 'Solid weight and beautiful engraving. Will last generations.', verified: true },
  { id: 'r-047', productId: 'kd-2', name: 'Yamini Reddy', rating: 5, date: '2024-06-25', comment: 'Bought the full set for our puja room. Looks divine.', verified: true },
  { id: 'r-048', productId: 'kd-2', name: 'Tarun Malhotra', rating: 4, date: '2024-08-20', comment: 'Traditional craftsmanship meets modern aesthetics. Very happy.', verified: false },

  // ── sc-1 (popular — 4 reviews) ──────────────────────────────────────────
  { id: 'r-049', productId: 'sc-1', name: 'Devika Nambiar', rating: 5, date: '2024-03-01', comment: 'This sculpture is a centrepiece in our drawing room. Magnificent.', verified: true },
  { id: 'r-050', productId: 'sc-1', name: 'Omkar Joshi', rating: 4, date: '2024-05-14', comment: 'Heavy and substantial. The bronze finish is rich and warm.', verified: true },
  { id: 'r-051', productId: 'sc-1', name: 'Padma Lakshmi', rating: 5, date: '2024-07-03', comment: "A true collector's piece. The artisan's skill is evident in every detail.", verified: true },
  { id: 'r-052', productId: 'sc-1', name: 'Harsh Vardhan', rating: 5, date: '2024-08-28', comment: 'Shipped safely and looks even better than the photos.', verified: false },

  // ── Other products (1-3 reviews each) ───────────────────────────────────

  // tc-2
  { id: 'r-053', productId: 'tc-2', name: 'Nalini Bose', rating: 4, date: '2024-03-10', comment: 'My succulents look amazing in this planter.', verified: true },
  { id: 'r-054', productId: 'tc-2', name: 'Raghunath Pillai', rating: 5, date: '2024-06-05', comment: 'Drainage hole is perfectly sized. Great for indoor plants.', verified: true },

  // tc-3
  { id: 'r-055', productId: 'tc-3', name: 'Manisha Thapar', rating: 5, date: '2024-10-15', comment: 'Used these for Diwali and they were magical.', verified: true },
  { id: 'r-056', productId: 'tc-3', name: 'Arun Khanna', rating: 5, date: '2024-10-20', comment: 'Perfect festive diyas. Will order again next year.', verified: true },

  // pt-1
  { id: 'r-057', productId: 'pt-1', name: 'Isha Sethi', rating: 5, date: '2024-04-03', comment: 'The teal glaze is gorgeous. We use it for salads daily.', verified: true },
  { id: 'r-058', productId: 'pt-1', name: 'Gaurav Chandra', rating: 4, date: '2024-07-22', comment: 'Handmade feel with studio pottery quality. Very pleased.', verified: true },

  // pt-2
  { id: 'r-059', productId: 'pt-2', name: 'Radha Krishnan', rating: 5, date: '2024-02-25', comment: 'These plates make every meal feel like a special occasion.', verified: true },

  // bp-3
  { id: 'r-060', productId: 'bp-3', name: 'Aditi Saxena', rating: 4, date: '2024-05-18', comment: 'Delicate blue pottery tile set. Perfect for our bathroom renovation.', verified: true },
  { id: 'r-061', productId: 'bp-3', name: 'Sudhir Rajan', rating: 5, date: '2024-07-30', comment: 'Authentic Jaipur blue pottery. The patterns are intricate and beautiful.', verified: true },

  // hs-3
  { id: 'r-062', productId: 'hs-3', name: 'Chitra Ramachandran', rating: 4, date: '2024-03-28', comment: 'Soft cotton with a lovely block print. Very comfortable.', verified: true },

  // hs-6
  { id: 'r-063', productId: 'hs-6', name: 'Kishore Mohan', rating: 5, date: '2024-06-10', comment: 'The Jamdani weave is exceptional. Worth the premium.', verified: true },
  { id: 'r-064', productId: 'hs-6', name: 'Usha Rani', rating: 4, date: '2024-08-25', comment: 'Elegant and lightweight. Perfect for summer.', verified: true },

  // ct-1
  { id: 'r-065', productId: 'ct-1', name: 'Anurag Sinha', rating: 5, date: '2024-04-20', comment: 'My toddler loves this toy. Safe, smooth and colourful.', verified: true },

  // ct-3
  { id: 'r-066', productId: 'ct-3', name: 'Jaya Subramaniam', rating: 4, date: '2024-05-05', comment: 'Wonderful traditional toy. The lacquer colours are vivid.', verified: true },

  // dk-3
  { id: 'r-067', productId: 'dk-3', name: 'Bibhuti Mohapatra', rating: 5, date: '2024-03-15', comment: 'The Dhokra figurine has such tribal charm. A unique art piece.', verified: true },
  { id: 'r-068', productId: 'dk-3', name: 'Sarita Kumari', rating: 4, date: '2024-06-28', comment: 'Beautiful lost-wax casting. Each one is truly one of a kind.', verified: false },

  // dk-5
  { id: 'r-069', productId: 'dk-5', name: 'Debashis Roy', rating: 5, date: '2024-07-12', comment: 'Exquisite tribal metalwork. This belongs in a gallery.', verified: true },

  // wd-1
  { id: 'r-070', productId: 'wd-1', name: 'Mohini Lal', rating: 4, date: '2024-02-14', comment: 'Beautiful wooden piece with detailed carving. Smells wonderful.', verified: true },
  { id: 'r-071', productId: 'wd-1', name: 'Jagdish Prasad', rating: 5, date: '2024-05-30', comment: 'A work of art. The rosewood grain is stunning.', verified: true },

  // wd-5
  { id: 'r-072', productId: 'wd-5', name: 'Chandini Ghosh', rating: 4, date: '2024-04-08', comment: 'Elegant spice box. Keeps spices fresh and looks great on the counter.', verified: true },

  // jb-1
  { id: 'r-073', productId: 'jb-1', name: 'Rukmini Devi', rating: 5, date: '2024-03-20', comment: 'Gorgeous lac bangles! The mirror work catches light beautifully.', verified: true },
  { id: 'r-074', productId: 'jb-1', name: 'Fatima Syed', rating: 4, date: '2024-07-08', comment: 'Vibrant red and gold. Perfect for festive occasions.', verified: true },

  // jt-2
  { id: 'r-075', productId: 'jt-2', name: 'Mrinalini Das', rating: 4, date: '2024-05-25', comment: 'Sturdy jute bag with a rustic charm. Very practical.', verified: true },

  // hd-1
  { id: 'r-076', productId: 'hd-1', name: 'Vikash Chowdhury', rating: 5, date: '2024-04-14', comment: 'This wall hanging transforms our living room. Stunning craftsmanship.', verified: true },
  { id: 'r-077', productId: 'hd-1', name: 'Lata Mangeshkar', rating: 4, date: '2024-08-12', comment: 'Rich colours and beautiful folk art motifs. Very pleased with the purchase.', verified: true },

  // wa-2
  { id: 'r-078', productId: 'wa-2', name: 'Navin Prabhakar', rating: 5, date: '2024-06-20', comment: 'The Warli painting is serene and elegant. Frames beautifully.', verified: true },

  // fa-1
  { id: 'r-079', productId: 'fa-1', name: 'Aparna Basu', rating: 5, date: '2024-03-30', comment: "Authentic Madhubani art with incredible detail. A collector's delight.", verified: true },
  { id: 'r-080', productId: 'fa-1', name: 'Ranjit Mallick', rating: 4, date: '2024-07-18', comment: 'The natural dyes give it such a warm, earthy feel.', verified: false },

  // ex-3
  { id: 'r-081', productId: 'ex-3', name: 'Indira Bhat', rating: 4, date: '2024-05-08', comment: 'Lovely Kalamkari piece. The hand-painted details are impressive.', verified: true },

  // kd-1
  { id: 'r-082', productId: 'kd-1', name: 'Vijay Mohan', rating: 5, date: '2024-02-10', comment: 'Handmade brass utensil that is both functional and decorative.', verified: true },
  { id: 'r-083', productId: 'kd-1', name: 'Sarla Gupta', rating: 4, date: '2024-06-04', comment: 'Sturdy and well-made. The hammered finish is unique.', verified: true },

  // bp-5
  { id: 'r-084', productId: 'bp-5', name: 'Madhav Rao', rating: 5, date: '2024-08-02', comment: 'Blue pottery soap dish — a tiny luxury for our bathroom.', verified: true },

  // jn-1
  { id: 'r-085', productId: 'jn-1', name: 'Tara Chand', rating: 4, date: '2024-04-22', comment: 'Beautiful silver necklace with tribal motifs. Very unique.', verified: true },
  { id: 'r-086', productId: 'jn-1', name: 'Parveen Bano', rating: 5, date: '2024-07-28', comment: 'Light enough for everyday wear yet striking enough for events.', verified: true },

  // st-2
  { id: 'r-087', productId: 'st-2', name: 'Radhika Menon', rating: 4, date: '2024-03-12', comment: 'The silk stole has a beautiful sheen. Very versatile.', verified: true },

  // bk-1
  { id: 'r-088', productId: 'bk-1', name: 'Sunil Thakur', rating: 5, date: '2024-05-15', comment: 'Block-printed bedsheet set that brightens our entire bedroom.', verified: true },

  // ik-1
  { id: 'r-089', productId: 'ik-1', name: 'Gayatri Deshpande', rating: 5, date: '2024-06-08', comment: 'The Pochampally ikat fabric is absolutely stunning.', verified: true },

  // hd-4
  { id: 'r-090', productId: 'hd-4', name: 'Ajay Devgan', rating: 4, date: '2024-07-15', comment: 'Brass candle holders add a warm glow to our dining table.', verified: true },

  // ex-7
  { id: 'r-091', productId: 'ex-7', name: 'Meenakshi Sundaram', rating: 5, date: '2024-04-30', comment: 'Kutch embroidery cushion covers — vibrant and luxurious.', verified: true },

  // tc-5
  { id: 'r-092', productId: 'tc-5', name: 'Brijesh Pal', rating: 5, date: '2024-08-06', comment: 'Classic matka keeps water so cold even in Delhi summers.', verified: true },

  // pt-4
  { id: 'r-093', productId: 'pt-4', name: 'Nandini Sarkar', rating: 4, date: '2024-06-15', comment: 'Rustic ceramic mug with a lovely glaze. My morning tea tastes better in it.', verified: true },

  // cn-2
  { id: 'r-094', productId: 'cn-2', name: 'Santosh Hegde', rating: 5, date: '2024-05-20', comment: "Channapatna stacking rings — my baby's favourite toy now.", verified: true },
];

/**
 * Get all reviews for a specific product, sorted by most recent first.
 */
export function getProductReviews(productId: string): Review[] {
  return reviews
    .filter(r => r.productId === productId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
